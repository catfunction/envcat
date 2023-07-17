"use client";

import { Input } from "@src/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import createProject from "@src/components/createProject/action/createProject";
import { Button } from "@src/components/ui/button";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().nonempty(),
  description: z.string(),
});

const CreateProject = ({ closeDialog }: { closeDialog: () => void }) => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await createProject(values);

      if (response.error) {
        form.setError("name", { message: response.error });
        return;
      }

      closeDialog();
      router.refresh();
      router.push(`/${response.id}`);
    } catch (e) {
      form.setError("name", { message: "Unknown error" });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-3"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-4">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateProject;
