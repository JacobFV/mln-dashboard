import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { LiteUser } from "../models/[...models]";

export default function getUser(): LiteUser {
  // TODO: somehow artificially set cwd path
  // because this function works whenever it's
  // called in a `/page/[...page]` route but not
  // in this file
  const { data: session, status: status } = useSession();

  if (!session || !session.user) {
    const router = useRouter();
    router.push("/account/login");
  }

  return session!.user! as LiteUser;
}
