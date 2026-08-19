import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FormStatus,
  Input,
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Spinner,
} from "@/shared";
import { Plus } from "lucide-react";
import { Controller } from "react-hook-form";
import { useExercisesForm } from "../model/use-exercises-form";

export const ExercisesDialogForm = () => {
  const {
    formExercises,
    errorForm,
    loadingForm,
    handleCreateExercise,
    setErrorForm,
    selectTypeExercises,
    open,
    setOpen,
  } = useExercisesForm();

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (loadingForm) return;
        setOpen(isOpen);
      }}
    >
      <form
        className="px-3"
        id="form-exercises"
        onSubmit={formExercises.handleSubmit(handleCreateExercise)}
      >
        <DialogTrigger asChild>
          <Button size="sm" variant="default" className="w-full">
            <Plus size={24} />
            Добавить задачу
          </Button>
        </DialogTrigger>
        <DialogContent
          className="sm:max-w-sm"
          onPointerDownOutside={(e) => {
            if (loadingForm) e.preventDefault();
          }}
          onEscapeKeyDown={(e) => {
            if (loadingForm) e.preventDefault();
          }}
        >
          <DialogHeader>
            <DialogTitle>Создание задачи</DialogTitle>
            <DialogDescription>
              Добавьте новое упражнение или риф для тренировки.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup className="flex flex-col gap-3">
            {/* Название */}
            <Controller
              name="title"
              control={formExercises.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="form-exercises-title">
                    Название
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-exercises-title"
                    aria-invalid={fieldState.invalid}
                    placeholder="Например: Пектуинг мажор"
                    type="title"
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Категория */}
            <Controller
              name="category"
              control={formExercises.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="form-exercises-category">
                    Категория
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-exercises-category"
                    aria-invalid={fieldState.invalid}
                    placeholder="Например: Техника"
                    type="text"
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Очки (XP) */}
            <Controller
              name="xp"
              control={formExercises.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="form-exercises-xp">Очки (XP)</FieldLabel>
                  <Input
                    {...field}
                    id="form-exercises-xp"
                    aria-invalid={fieldState.invalid}
                    placeholder="Очки"
                    type="number"
                    min={1}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Тип (exercise или riff) */}
            <Controller
              name="type"
              control={formExercises.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="form-exercises-types">
                    Тип задачи
                  </FieldLabel>
                  <Select
                    required
                    value={field.value}
                    onValueChange={field.onChange}
                    defaultValue={selectTypeExercises[0].value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {selectTypeExercises.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            {/* Ссылка */}
            <Controller
              name="link"
              control={formExercises.control}
              render={({ field, fieldState }) => (
                <Field
                  data-invalid={fieldState.invalid}
                  className="flex flex-col gap-2"
                >
                  <FieldLabel htmlFor="form-exercises-link">
                    Ссылка (Табулатура / Видео)
                  </FieldLabel>
                  <Input
                    {...field}
                    id="form-exercises-link"
                    aria-invalid={fieldState.invalid}
                    placeholder="https://..."
                    type="text"
                    min={1}
                    disabled={loadingForm}
                    onClick={() => setErrorForm("")}
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <FormStatus error={errorForm} />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Отмена
              </Button>
            </DialogClose>
            <Button form="form-exercises" type="submit" disabled={loadingForm}>
              {loadingForm ? <Spinner /> : " Добавить задачу"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};
