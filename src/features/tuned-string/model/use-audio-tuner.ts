"use client";

import { useEffect, useState, useRef } from "react";
import { YIN } from "pitchfinder";

// Добавляем targetFreq в аргументы хука
export const useAudioTuner = (isActive: boolean, targetFreq: number) => {
  const [detectedFrequency, setDetectedFrequency] = useState<number | null>(
    null,
  );
  const audioContextRef = useRef<AudioContext | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const animationFrameRef = useRef<number | null>(null);
  const prevFreqRef = useRef<number | null>(null);

  // Реф для фильтра, чтобы динамически менять его частоту
  const filterRef = useRef<BiquadFilterNode | null>(null);

  // Эффект для динамического изменения частоты среза фильтра при смене струны на UI
  useEffect(() => {
    if (filterRef.current && audioContextRef.current) {
      // Ставим частоту среза чуть выше целевой частоты струны (с запасом в 40%),
      // чтобы строй не срезался, но лишний грязевой верх уходил
      const newCutoff = targetFreq * 1.4;
      filterRef.current.frequency.setValueAtTime(
        newCutoff,
        audioContextRef.current.currentTime,
      );
    }
  }, [targetFreq]);

  useEffect(() => {
    if (!isActive) return;

    const detectPitch = YIN({ sampleRate: 44100, threshold: 0.25 });

    async function initAudio() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: {
            echoCancellation: false,
            noiseSuppression: false,
            autoGainControl: true,
          },
        });
        streamRef.current = stream;

        const AudioContextClass =
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          window.AudioContext || (window as any).webkitAudioContext;
        const audioContext = new AudioContextClass();
        audioContextRef.current = audioContext;

        const actualSampleRate = audioContext.sampleRate;
        const exactDetectPitch = YIN({
          sampleRate: actualSampleRate,
          threshold: 0.25,
        });

        const source = audioContext.createMediaStreamSource(stream);

        const gainNode = audioContext.createGain();
        gainNode.gain.setValueAtTime(3.0, audioContext.currentTime);

        // Инициализируем фильтр с динамической частотой
        const lowpassFilter = audioContext.createBiquadFilter();
        lowpassFilter.type = "lowpass";
        lowpassFilter.frequency.setValueAtTime(
          targetFreq * 1.4,
          audioContext.currentTime,
        );
        filterRef.current = lowpassFilter; // сохраняем в реф

        const analyser = audioContext.createAnalyser();
        analyser.fftSize = 4096;

        source.connect(gainNode);
        gainNode.connect(lowpassFilter);
        lowpassFilter.connect(analyser);

        const bufferLength = analyser.fftSize;
        const dataArray = new Float32Array(bufferLength);

        const updatePitch = () => {
          analyser.getFloatTimeDomainData(dataArray);

          let sumSquares = 0;
          for (let i = 0; i < dataArray.length; i++) {
            sumSquares += dataArray[i] * dataArray[i];
          }
          const rms = Math.sqrt(sumSquares / dataArray.length);

          const pitch = exactDetectPitch(dataArray);

          if (rms < 0.004) {
            animationFrameRef.current = requestAnimationFrame(updatePitch);
            return;
          }

          // Расширяем рамки детекции до 500 Гц, чтобы первая струна (293 Hz) проходила валидацию
          if (pitch && pitch > 35 && pitch < 500) {
            if (prevFreqRef.current !== null) {
              const smoothed = prevFreqRef.current * 0.7 + pitch * 0.3;
              prevFreqRef.current = smoothed;
              setDetectedFrequency(smoothed);
            } else {
              prevFreqRef.current = pitch;
              setDetectedFrequency(pitch);
            }
          }

          animationFrameRef.current = requestAnimationFrame(updatePitch);
        };

        animationFrameRef.current = requestAnimationFrame(updatePitch);
      } catch (err) {
        console.error("Ошибка тюнера:", err);
      }
    }

    initAudio();

    return () => {
      setDetectedFrequency(null);
      prevFreqRef.current = null;
      filterRef.current = null;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isActive]);

  return detectedFrequency;
};
