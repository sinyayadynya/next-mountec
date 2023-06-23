import * as React from "react";
import { DrupalUser } from "next-drupal";

interface UserProps {
  user: DrupalUser;
}

export function User({ user }: UserProps) {
  return <>{user.display_name}</>;
}
