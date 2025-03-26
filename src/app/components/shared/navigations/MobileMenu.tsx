import { useRouter } from "next/navigation";
import { Button } from "../buttons/Button";
import Link from "next/link";
import { useHydrateUser } from "@/helper/user";   

const MenuModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: (state: boolean) => void;
}) => {
  const router = useRouter();
  const { isHydrated, userData } = useHydrateUser();
  const links = [
    { text: "Home", link: "/" },
    // { text: "Categories", link: "/" },
    { text: "About", link: "/" },
  ];

  const handleClose = () => {
    onClose && onClose(false);
  };

  return (
    <div>
      {isOpen && (
        <div
          onClick={handleClose}
          className="fixed bottom-0 left-0 w-full z-[100] h-[100vh] bg-transparent bg-opacity-20"
        />
      )}
      <div
        className={` fixed bottom-0 right-0 h-[100vh] z-[100] transition-all duration-500 max-w-[35rem] w-full bg-white pt-[85px] ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col justify-center items-center gap-10 pt-[130px]">
          {links.map((link) => (
            <Link href={link.link}>{link.text}</Link>
          ))}
          {isHydrated && Object.keys(userData).length > 0 && (
            <Link href="/orders" className="">
              Orders
            </Link>
          )}
          {isHydrated && Object.keys(userData).length <= 0 ? (
            <div className="flex flex-col justify-center items-center gap-10">
              <Button
                className="font-medium text-[16px] w-[143px]"
                variant="outline"
                onClick={() => router.push("sign-in")}
              >
                Sign in
              </Button>
              <Button
                className="font-medium text-[16px] w-[143px]"
                onClick={() => router.push("sign-up")}
              >
                Sign up
              </Button>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default MenuModal;
