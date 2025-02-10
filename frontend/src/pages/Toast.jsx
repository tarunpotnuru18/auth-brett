import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner";
export default function ToastTest() {
  function handelclick() {
    toast("hi there", {
      description: "error due to laziness",
      duration: 2000,
     
    });
  }
  return (
    <>
      <div className="bg-black h-screen w-screen flex justify-center items-center ">
        <button
          className="p-3 border-gray-500 border-[1px] rounded-md border-solid text-white text-bold"
          onClick={() => {
            handelclick();
          }}
        >
          Render a Toast
        </button>
      </div>
      <Toaster closeButton richColors toastOptions={{
    classNames: {
      toast: 'bg-blue-400',
      title: 'text-red-400',
      description: 'text-red-400',
      actionButton: 'bg-zinc-400',
      cancelButton: 'bg-orange-400',
      closeButton: 'bg-lime-400',
    },
  }} ></Toaster>
    </>
  );
}
