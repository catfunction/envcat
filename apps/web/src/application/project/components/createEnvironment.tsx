"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import createEnvironment from "@src/application/project/actions/createEnvironment";
import { Button } from "@src/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@src/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@src/components/ui/form";
import { Input } from "@src/components/ui/input";
import { Folder } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().nonempty(),
});

const CreateEnvironment = ({ projectId }: { projectId: string }) => {
  const router = useRouter();
  const [showDialog, setDialog] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values) => {
    try {
      const response = await createEnvironment({ ...values, projectId });
      if (response?.error) {
        form.setError("name", {
          message: response.error,
        });
        return;
      }
      setDialog(false);
      router.refresh();
    } catch (e) {
      form.setError("name", { message: "Unknown error" });
      return;
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setDialog}>
      <Button
        variant="outline"
        className="flex gap-2"
        onClick={() => setDialog(true)}
      >
        <Folder />
        Create environment
      </Button>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create environment</DialogTitle>
          <DialogDescription>
            Add a new environment to the current project
          </DialogDescription>
        </DialogHeader>
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
            <Button type="submit" className="mt-4">
              Create
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateEnvironment;
