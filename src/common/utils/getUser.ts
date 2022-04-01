import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LiteUser } from "../models/[...models]";

export default function getUser(): LiteUser {
  // artificially set cwd path
  const { data: session, status: status } = useSession();

  if (!session || !session.user) {
    const router = useRouter();
    router.push("/account/login");
  }

  return session!.user! as LiteUser;
}
