import { Link } from "react-router-dom";


export default function Welcome() {
  const { toast } = useToast();
  return (
    <>
      <div className="bg-black text-white  min-h-screen w-screen pt-[50px]">
        <div className="w-full fixed top-0 h-[50px] text-center py-2 px-[10px] flex justify-between pl-[35px]">
          <div className=" text-stone-100 font-serif">Auth</div>

          <div className=" flex gap-3">
            <button>
              <Link to={"/login"}>Login</Link>
            </button>
            <button>
              <Link to={"/signup"}>Signup</Link>
            </button>
          </div>
        </div>
        <div className="w-full flex justify-center flex-col">
          <div className="text-center w-full">
            hey there welcome to the testing software for the auth api! we are
            pleased to have you here 💌
          </div>
          <button
            onClick={() => {

                toast({
                    className: "bg-black  text-white",
                  description: "Your message has been sent.",
                })
              }}
          >
            toast
          </button>
          
          <div className="w-full   h-[50px] text-center py-2 px-[10px]">
            made with ❤️ by <span className="text-red-500">tarun</span>
          </div>
        </div>
      </div>
    </>
  );
}
