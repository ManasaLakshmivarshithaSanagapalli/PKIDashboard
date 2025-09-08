import { CACreationForm } from "@/components/ca-creation-form"

export default function CreateCAPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-black text-cyan-800 font-sans">Create Certificate Authority</h1>
        <p className="text-slate-600 mt-2 font-sans">Set up a new Certificate Authority for your PKI infrastructure</p>
      </div>

      <CACreationForm />
    </div>
  )
}
