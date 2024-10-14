"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  username: z.string().min(2).max(50),
});

export default function Pag() {
  const [outputImg, setOutputImg] = useState<string | null>(null);
  const [inputPrompt, setInputPrompt] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values);
  }

  return (
    <div className="w-full p-3 h-dvh flex justify-start items-center pt-[72px] flex-col">
      <div className="w-full border border-red-500 p-3">
        <h1 className="text-center font-bold text-white text-4xl">Create</h1>
        <p className="text-white/60 text-center">
          Generate Stunning Images from Text for FREE
        </p>
      </div>
      <div className="flex border border-green-500 w-full gap-3 h-full">
        <div className="__form flex-[2] gap-2 flex justify-center items-start flex-col">
          <p className="text-left text-sm text-white/80">
            Type your prompt below to create any image you can imagine!
          </p>
          <div className="flex gap-2 w-full">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="">
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="a cat sitting over a sofa..."
                          className="max-w-[70%] transition-all"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your public display name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit">Generate</Button>
              </form>
            </Form>
          </div>
        </div>
        <div className="__output flex-[1] bg-white/5 rounded-lg"></div>
      </div>
    </div>
  );
}
