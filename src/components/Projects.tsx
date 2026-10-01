import { Github, PlayCircle } from 'lucide-react';
import { PROJECTS } from '../data/site';
import { ProjectVisual } from './ProjectVisual';
import { LinkButton } from './ui/LinkButton';
import { Reveal } from './ui/Reveal';
import { Section } from './ui/Section';
import { SectionHeading } from './ui/SectionHeading';
import { TiltCard } from './ui/TiltCard';

export function Projects() {
  return (
    <Section id="projects" tint="violet">
      <div className="container-x">
        <Reveal>
          <SectionHeading
            eyebrow="Projects"
            title="Work that shows how I think with data."
            description="Classroom analyses, dashboards and self-directed experiments. Links appear once the repositories are published."
          />
        </Reveal>

        <div className="mt-12 grid gap-5 lg:grid-cols-2">
          {PROJECTS.map((project, index) => (
            <Reveal key={project.id} delay={(index % 2) * 0.08}>
              <TiltCard className="h-full">
                <article className="glass glass-hover group/card flex h-full flex-col p-5 sm:p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <span className="num text-[11px] tracking-widest text-slate-600">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <span
                      className={`rounded-full border px-2.5 py-0.5 font-mono text-[9.5px] uppercase tracking-[0.16em] ${
                        project.status === 'Ongoing'
                          ? 'border-pink-300/25 bg-pink-300/10 text-pink-200'
                          : 'border-emerald-400/20 bg-emerald-400/10 text-emerald-200'
                      }`}
                    >
                      {project.status}
                    </span>
                  </div>

                  <div className="overflow-hidden rounded-xl">
                    <div className="transition-transform duration-700 ease-out group-hover/card:scale-[1.03]">
                      <ProjectVisual kind={project.kind} title={project.title} />
                    </div>
                  </div>

                  <h3 className="mt-5 text-lg font-semibold leading-snug text-white">{project.title}</h3>
                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-slate-400">{project.description}</p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {project.tech.map((tech) => (
                      <li key={tech} className="chip">
                        {tech}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-auto flex flex-wrap items-center gap-2.5 pt-6">
                    <LinkButton href={project.github} icon={<Github size={15} aria-hidden />} pendingLabel="Repo">
                      GitHub
                    </LinkButton>
                    <LinkButton href={project.demo} icon={<PlayCircle size={15} aria-hidden />} pendingLabel="Soon">
                      Live Demo
                    </LinkButton>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>
    </Section>
  );
}
