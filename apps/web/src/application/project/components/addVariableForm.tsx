"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@src/components/ui/card";
import { Input } from "@src/components/ui/input";
import { Button } from "@src/components/ui/button";
import { PlusCircle, SaveIcon } from "lucide-react";
import { useRouter } from "next/navigation";
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

const formSchema = z.object({
  variables: z.array(z.object({ name: z.string(), value: z.string() })),
  environments: z.array(z.string()),
});

const AddVariableForm = ({ environments }: { environments: any[] }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { variables: [{ name: "", value: "" }], environments: [] },
  });
  const { fields, append } = useFieldArray({
    control: form.control,
    name: "variables",
  });

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
          <div className="flex flex-row gap-2 items-center">
            <Checkbox
              id={environment.id}
              checked={field.value?.includes(environment.id)}
              onCheckedChange={(checked) => {
                return checked
                  ? field.onChange([...field.value, environment.id])
                  : field.onChange(
                      field.value?.filter((value) => value !== environment.id),
                    );
              }}
            />
            <label htmlFor={environment.id} className="text-xs">
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
            (variable) => variable.name === response.variable,
          );
        form.setError(`variables.${errorIndex}.name`, {
          message: response.error,
        });

        return;
      }
      form.reset();

      router.refresh();
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card className="max-w-2xl bg-gray-100">
          <CardHeader>
            <CardTitle className="text-xl">Add variables</CardTitle>
          </CardHeader>
          <CardContent className="pb-2">
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-4">
                <span className="flex-1">Name</span>
                <span className="flex-1">Value</span>
              </div>
              <div className="flex flex-col gap-2">
                {fields.map(renderVariable)}
              </div>

              <div>
                <Button
                  className="flex flex-row gap-2"
                  size="sm"
                  variant="outline"
                  type="button"
                  onClick={addNewVariable}
                >
                  <PlusCircle /> ADD NEW
                </Button>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between items-end select-none">
            <div className="flex flex-row gap-3">
              {environments.map(renderEnvironment)}
            </div>
            <Button type="submit" className="flex flex-row gap-1">
              <SaveIcon /> Save
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
};

export default AddVariableForm;
