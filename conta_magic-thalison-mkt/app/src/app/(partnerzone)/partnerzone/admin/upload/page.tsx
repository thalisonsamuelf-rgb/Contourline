"use client"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import {
  Upload,
  ArrowLeft,
  FileUp,
  X,
  Check,
  AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { formatFileSize } from "@/lib/partnerzone/types"

const categories = [
  { value: "institucional", label: "Institucional" },
  { value: "marketing", label: "Marketing" },
  { value: "vendas", label: "Vendas" },
  { value: "treinamento", label: "Treinamento" },
]

const subcategories: Record<string, Array<{ value: string; label: string }>> = {
  institucional: [
    { value: "logo-marca", label: "Logo & Marca" },
    { value: "manual-marca", label: "Manual de Marca" },
    { value: "apresentacoes-inst", label: "Apresentações" },
    { value: "videos-institucionais", label: "Vídeos Institucionais" },
  ],
  marketing: [
    { value: "templates-social", label: "Templates Social Media" },
    { value: "catalogos", label: "Catálogos" },
    { value: "materiais-eventos", label: "Materiais para Eventos" },
    { value: "fotos-videos-produto", label: "Fotos & Vídeos de Produto" },
  ],
  vendas: [
    { value: "propostas-comerciais", label: "Propostas Comerciais" },
    { value: "tabelas-preco", label: "Tabelas de Preço" },
    { value: "cases-sucesso", label: "Cases de Sucesso" },
    { value: "scripts-argumentarios", label: "Scripts & Argumentários" },
  ],
  treinamento: [
    { value: "onboarding", label: "Onboarding" },
    { value: "produto-tecnico", label: "Produto & Técnico" },
    { value: "compliance-anvisa", label: "Compliance Anvisa" },
  ],
}

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("")
  const [selectedSubcategory, setSelectedSubcategory] = useState("")
  const [tagInput, setTagInput] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      setFile(droppedFile)
      if (!title) setTitle(droppedFile.name.replace(/\.[^.]+$/, ""))
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      if (!title) setTitle(selectedFile.name.replace(/\.[^.]+$/, ""))
    }
  }

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault()
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()])
      }
      setTagInput("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter((t) => t !== tag))
  }

  const handleUpload = async () => {
    if (!file || !title || !selectedCategory) return
    setUploading(true)

    // Simulate upload — in production, this would call the API route
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setUploading(false)
    setUploaded(true)
  }

  const isValid = file && title && selectedCategory

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col gap-6 max-w-2xl"
    >
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/partnerzone/admin" className="hover:text-foreground transition-colors">
          Admin
        </Link>
        <span>/</span>
        <span className="text-foreground font-medium">Upload</span>
      </div>

      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Upload className="size-6 text-primary" />
          Upload de Material
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Adicione um novo material ao PartnerZone
        </p>
      </div>

      {uploaded ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center gap-4 py-12 px-6 rounded-xl border border-emerald-500/30 bg-emerald-500/5"
        >
          <div className="size-16 rounded-full bg-emerald-500/20 flex items-center justify-center">
            <Check className="size-8 text-emerald-500" />
          </div>
          <h2 className="text-lg font-semibold text-foreground">Material enviado com sucesso!</h2>
          <p className="text-sm text-muted-foreground text-center">
            O material "{title}" foi adicionado ao PartnerZone e já está disponível para download.
          </p>
          <div className="flex gap-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setFile(null)
                setTitle("")
                setDescription("")
                setSelectedCategory("")
                setSelectedSubcategory("")
                setTags([])
                setUploaded(false)
              }}
            >
              Enviar outro
            </Button>
            <Link href="/partnerzone/admin">
              <Button variant="secondary" size="sm">
                Voltar ao Admin
              </Button>
            </Link>
          </div>
        </motion.div>
      ) : (
        <div className="flex flex-col gap-5">
          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            className={cn(
              "relative flex flex-col items-center justify-center gap-3 p-8 rounded-xl border-2 border-dashed transition-all duration-300 cursor-pointer",
              isDragging
                ? "border-primary bg-primary/5 scale-[1.01]"
                : file
                ? "border-emerald-500/50 bg-emerald-500/5"
                : "border-border hover:border-primary/50 hover:bg-bg-surface"
            )}
          >
            <input
              type="file"
              onChange={handleFileSelect}
              className="absolute inset-0 opacity-0 cursor-pointer"
              accept="*/*"
            />
            {file ? (
              <div className="flex items-center gap-3">
                <FileUp className="size-8 text-emerald-500" />
                <div>
                  <p className="text-sm font-medium text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground">{formatFileSize(file.size)}</p>
                </div>
                <button
                  onClick={(e) => { e.preventDefault(); setFile(null) }}
                  className="p-1 rounded-md hover:bg-bg-surface transition-colors"
                >
                  <X className="size-4 text-muted-foreground" />
                </button>
              </div>
            ) : (
              <>
                <FileUp className="size-10 text-muted-foreground" />
                <div className="text-center">
                  <p className="text-sm font-medium text-foreground">
                    Arraste o arquivo aqui ou clique para selecionar
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    PDF, imagens, vídeos, documentos — até 500MB
                  </p>
                </div>
              </>
            )}
          </div>

          {/* Form fields */}
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Título *
              </label>
              <Input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Nome do material"
                className="h-11"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Descrição
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Breve descrição do material..."
                rows={3}
                className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-hidden resize-none dark:bg-input/30"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Categoria *
                </label>
                <select
                  value={selectedCategory}
                  onChange={(e) => {
                    setSelectedCategory(e.target.value)
                    setSelectedSubcategory("")
                  }}
                  className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-hidden dark:bg-input/30"
                >
                  <option value="">Selecione...</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Subcategoria
                </label>
                <select
                  value={selectedSubcategory}
                  onChange={(e) => setSelectedSubcategory(e.target.value)}
                  disabled={!selectedCategory}
                  className="h-11 w-full rounded-md border border-input bg-transparent px-3 text-sm shadow-xs transition-colors focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 outline-hidden disabled:opacity-50 dark:bg-input/30"
                >
                  <option value="">Selecione...</option>
                  {selectedCategory &&
                    subcategories[selectedCategory]?.map((sub) => (
                      <option key={sub.value} value={sub.value}>
                        {sub.label}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                Tags
              </label>
              <div className="flex flex-wrap gap-1.5 mb-1">
                {tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1 pr-1">
                    {tag}
                    <button onClick={() => handleRemoveTag(tag)} className="p-0.5 rounded-full hover:bg-bg-surface">
                      <X className="size-2.5" />
                    </button>
                  </Badge>
                ))}
              </div>
              <Input
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleAddTag}
                placeholder="Digite uma tag e pressione Enter"
                className="h-9"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="flex items-center justify-between pt-2">
            <Link href="/partnerzone/admin">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="size-4 mr-1.5" />
                Cancelar
              </Button>
            </Link>

            <Button
              variant="primary"
              size="md"
              onClick={handleUpload}
              disabled={!isValid || uploading}
            >
              {uploading ? (
                <>
                  <div className="size-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  Enviando...
                </>
              ) : (
                <>
                  <Upload className="size-4 mr-1.5" />
                  Enviar Material
                </>
              )}
            </Button>
          </div>

          {!isValid && file && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <AlertCircle className="size-3.5" />
              Preencha o título e selecione uma categoria para enviar
            </div>
          )}
        </div>
      )}
    </motion.div>
  )
}
