import { usePathname } from "next/navigation";
import { useSession, signIn } from "next-auth/react";

const requireSession = () => {
  const pathName = usePathname();
  const { data: session } = useSession();

  if (pathName.startsWith("/my-mindmap") && !session) {
    signIn();
  }
};

export default requireSession;
