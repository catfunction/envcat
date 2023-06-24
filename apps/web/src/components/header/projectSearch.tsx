"use client";

import {
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@src/components/ui/command";
import Link from "next/link";
import { useState } from "react";

const ProjectSearch = ({ projects: projectsProp }) => {
  const [projects, setProjects] = useState(projectsProp);

  const renderProject = ({ id, name }) => {
    return (
      <CommandItem key={id}>
        <Link prefetch={false} href={`/${id}`} className="w-full h-full">
          {name}
        </Link>
      </CommandItem>
    );
  };

  const onInput = (event) => {
    if (!event.target.value) {
      return setProjects(projectsProp);
    }

    const filteredProjects = projectsProp.filter((project) => {
      return project.name
        .toLowerCase()
        .includes(event.target.value.toLowerCase());
    });

    setProjects(filteredProjects);
  };

  return (
    <>
      <CommandInput placeholder="Search project..." onInput={onInput} />
      <CommandGroup heading="Projects">
        {projects.map(renderProject)}
      </CommandGroup>
    </>
  );
};

export default ProjectSearch;
