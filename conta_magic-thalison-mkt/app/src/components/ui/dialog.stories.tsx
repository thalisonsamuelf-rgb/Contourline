import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { fn } from "storybook/test";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "./dialog";
import { Button } from "./button";

const meta = {
  title: "Molecules/Overlays/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof Dialog>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Abrir diálogo</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar ação</DialogTitle>
          <DialogDescription>
            Você tem certeza que deseja continuar? Esta ação não pode ser
            desfeita após a confirmação.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  ),
};

export const WithFooterActions: Story = {
  name: "Com ações no rodapé",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Excluir história</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Excluir história</DialogTitle>
          <DialogDescription>
            A história 3.2 - Implementar autenticação OAuth será excluída
            permanentemente. Todo o progresso registrado será perdido.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button variant="primary" onClick={fn()}>
            Confirmar exclusão
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const WithForm: Story = {
  name: "Com formulário",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="primary">Nova história</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova história</DialogTitle>
          <DialogDescription>
            Preencha as informações básicas para criar uma nova história de
            desenvolvimento no epic atual.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-4 py-2">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="story-title">
              Título da história
            </label>
            <input
              id="story-title"
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm outline-hidden focus:ring-2 focus:ring-ring"
              placeholder="Ex: Implementar tela de login"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium" htmlFor="story-epic">
              Epic
            </label>
            <input
              id="story-epic"
              className="h-9 rounded-md border border-input bg-transparent px-3 text-sm outline-hidden focus:ring-2 focus:ring-ring"
              placeholder="Ex: Epic 3 - Autenticação"
            />
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancelar</Button>
          </DialogClose>
          <Button variant="primary" onClick={fn()}>
            Criar história
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};

export const NoCloseButton: Story = {
  name: "Sem botão fechar",
  render: () => (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">Abrir sem X</Button>
      </DialogTrigger>
      <DialogContent showCloseButton={false}>
        <DialogHeader>
          <DialogTitle>Processando deploy</DialogTitle>
          <DialogDescription>
            Aguarde enquanto o agente DevOps realiza o deploy para produção.
            Este processo pode levar alguns minutos.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Fechar</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
};
