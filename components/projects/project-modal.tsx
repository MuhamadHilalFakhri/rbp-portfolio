"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogPortal,
} from "@/components/ui/dialog";
import type { Project } from "./project-types";
import { useProjectMedia } from "./use-project-media";
import { ProjectMediaStage } from "./project-media-stage";
import { ProjectDetails } from "./project-details";
import { ProjectLightbox } from "./project-lightbox";

type ProjectModalProps = {
  project: Project | null;
  onClose: () => void;
};

export function ProjectModal({
  project,
  onClose,
}: ProjectModalProps): ReactNode {
  const media = useProjectMedia(project, onClose);
  const { requestClose, isFullscreen, isVideoSlide } = media;

  return (
    <Dialog
      open={Boolean(project)}
      onOpenChange={(open) => {
        if (!open) requestClose();
      }}
    >
      <AnimatePresence>
        {project ? (
          <DialogPortal forceMount>
            <DialogOverlay forceMount asChild>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
              />
            </DialogOverlay>

            <DialogContent
              forceMount
              asChild
              showCloseButton={false}
              aria-describedby={undefined}
              className="max-h-[calc(100dvh-1rem)] w-full max-w-xl rounded-2xl p-0 min-[360px]:rounded-3xl sm:max-h-[calc(100dvh-3rem)]"
            >
              <motion.div
                initial={{ opacity: 0, y: 32, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 24, scale: 0.98 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="flex max-h-full flex-col max-sm:max-h-[calc(100dvh-1rem)]"
              >
                <ProjectMediaStage project={project} {...media} />
                <ProjectDetails project={project} />
              </motion.div>
            </DialogContent>
          </DialogPortal>
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {project && isFullscreen && !isVideoSlide ? (
          <DialogPortal forceMount>
            <ProjectLightbox project={project} {...media} />
          </DialogPortal>
        ) : null}
      </AnimatePresence>
    </Dialog>
  );
}
