"use client";

import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { PlusCircle, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import createVariables from "@src/application/project/actions/createVariables";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormMessage,
} from "@src/components/ui/form";
import { Checkbox } from "@src/components/ui/checkbox";
import { useEffect } from "react";
import CreateEnvironment from "@src/application/project/components/createEnvironment";

const formSchema = z.object({
  variables: z.array(
    z.object({ name: z.string().nonempty(), value: z.string() })
  ),
  environments: z.array(z.string()),
});

const AddVariableForm = ({
  environments,
  closeSheet,
  projectId,
}: {
  environments: any[];
  projectId: string;
  closeSheet?: () => void;
}) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { variables: [{ name: "", value: "" }], environments: [] },
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "variables",
  });

  useEffect(() => {
    window.addEventListener("paste", onPasteEnv);

    return () => {
      window.removeEventListener("paste", onPasteEnv);
    };
  }, []);

  const onPasteEnv = (e) => {
    const data = e.clipboardData.getData("text");
    data.split("\n").forEach((line: string) => {
      const [name, value] = line.split(/=(.*)/s);

      if (name) {
        append({ name, value });
      }
    });

    fields.forEach((field, index: number) => {
      if (!field.name) {
        remove(index);
      }
    });
  };

  const addNewVariable = () => {
    append({ name: "", value: "" });
  };

  const renderVariable = (item, index) => {
    return (
      <div className="flex flex-row gap-4" key={item.id}>
        <FormField
          control={form.control}
          name={`variables.${index}.name`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Input
                {...field}
                placeholder="e.g. DATABASE_USER"
                aria-label={field.name}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name={`variables.${index}.value`}
          render={({ field }) => (
            <FormItem className="flex-1">
              <Input {...field} aria-label={field.name} />
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    );
  };

  const renderEnvironment = (environment) => {
    return (
      <FormField
        control={form.control}
        name="environments"
        key={environment.id}
        render={({ field }) => (
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg border bg-white shadow-sm">
            <Checkbox
              id={environment.id}
              checked={field.value?.includes(environment.id)}
              onCheckedChange={(checked) => {
                return checked
                  ? field.onChange([...field.value, environment.id])
                  : field.onChange(
                      field.value?.filter((value) => value !== environment.id)
                    );
              }}
            />
            <label
              htmlFor={environment.id}
              className="text-xs font-medium text-gray-700"
            >
              {environment.name}
            </label>
          </div>
        )}
      />
    );
  };

  const onSubmit = async (values) => {
    try {
      const response = await createVariables(values);
      if (response.error) {
        const errorIndex = form
          .getValues()
          .variables.findIndex(
            (variable) => variable.name === response.variable
          );
        form.setError(`variables.${errorIndex}.name`, {
          message: response.error,
        });
        return;
      }

      toast.success("Variables added successfully");
      if (closeSheet) {
        closeSheet();
      }
      form.reset();
      router.refresh();
    } catch (e) {
      toast.error("Error adding variables", e.message);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={(e) => {
          if (form.getValues().environments.length === 0) {
            e.preventDefault();
            toast.error("You must select at least one environment.");
            return;
          }
          form.handleSubmit(onSubmit)(e);
        }}
      >
        <div>
          <div className="mb-4 flex flex-row gap-4 border-b pb-2">
            <span className="flex-1 text-xs font-semibold text-gray-500">
              Name
            </span>
            <span className="flex-1 text-xs font-semibold text-gray-500">
              Value
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {fields.map(renderVariable)}
            <Button
              className="flex flex-row gap-2 mt-2 w-fit"
              size="sm"
              variant="outline"
              type="button"
              onClick={addNewVariable}
            >
              <PlusCircle size={16} /> Add new
            </Button>
            <div className="mb-2">
              <span className="text-xs text-blue-600 bg-blue-50 rounded px-2 py-1">
                You can copy and paste a .env file here and the form will be
                auto-generated.
              </span>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex flex-row gap-3 items-center mb-2">
              <span className="text-xs text-gray-500 font-medium">
                Environments:
              </span>
              {environments.length === 0 && (
                <span className="text-xs text-red-500 font-semibold">
                  No environments found.
                </span>
              )}
            </div>
            {environments.length === 0 && (
              <div className="flex flex-row gap-2 items-center">
                <CreateEnvironment projectId={projectId} />
              </div>
            )}
            {environments.length > 0 && (
              <div className="flex flex-row gap-4 flex-wrap">
                {environments.map(renderEnvironment)}
              </div>
            )}
          </div>
          <div className="mt-6 flex justify-end">
            <Button
              type="submit"
              className="flex flex-row gap-1"
              size="sm"
              variant="default"
            >
              <SaveIcon size={16} /> Save
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddVariableForm;
