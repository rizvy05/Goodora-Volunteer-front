"use client";

import { useRef, useState, type ChangeEvent } from "react";
import Link from "next/link";
import { CameraIcon, SaveIcon, UserRoundIcon } from "lucide-react";

import { authClient } from "@/lib/auth-client";
import { fileToDataUrl } from "@/lib/image";
import { toast } from "@/components/ui/toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  const fileInputRef = useRef<HTMLInputElement>(null);

  /** `null` means "not edited yet" — the field then follows the session name. */
  const [name, setName] = useState<string | null>(null);
  const [pendingImage, setPendingImage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [savingPicture, setSavingPicture] = useState(false);
  const [savingName, setSavingName] = useState(false);

  const user = session?.user;
  const nameValue = name ?? user?.name ?? "";
  const avatarSrc = pendingImage ?? user?.image ?? "";

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    setError(null);

    try {
      setPendingImage(await fileToDataUrl(file, 512));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Could not read the image.");
      event.target.value = "";
    }
  }

  async function savePicture() {
    if (!pendingImage) return;

    setSavingPicture(true);
    setError(null);

    const { error: updateError } = await authClient.updateUser({
      image: pendingImage,
    });

    setSavingPicture(false);

    if (updateError) {
      setError(updateError.message ?? "Could not save your picture.");
      return;
    }

    setPendingImage(null);
    toast.add({
      type: "success",
      title: "Profile picture saved",
      description: "Your picture is now stored on your account.",
    });
  }

  async function saveName(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmed = nameValue.trim();
    if (!trimmed) return;

    setSavingName(true);
    setError(null);

    const { error: updateError } = await authClient.updateUser({
      name: trimmed,
    });

    setSavingName(false);

    if (updateError) {
      setError(updateError.message ?? "Could not save your name.");
      return;
    }

    setName(trimmed);

    toast.add({
      type: "success",
      title: "Name updated",
      description: `You are now ${trimmed}.`,
    });
  }

  if (isPending) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
        <Skeleton className="h-64 w-full rounded-xl" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-md flex-col items-center justify-center gap-4 px-4 py-16 text-center">
        <UserRoundIcon className="size-10 text-muted-foreground" aria-hidden />
        <div>
          <h1 className="font-heading text-2xl font-semibold">Your profile</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Sign in to manage your name and profile picture.
          </p>
        </div>
        <Button render={<Link href="/signin?callbackURL=%2Fprofile" />}>
          Sign in
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 lg:py-16">
      <p className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">
        Profile
      </p>
      <h1 className="font-heading mt-1 text-3xl font-semibold tracking-tight">
        Your account
      </h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Your picture and name are stored with your account and shown wherever
        you appear on the site.
      </p>

      {error && (
        <p role="alert" className="mt-4 text-sm text-destructive">
          {error}
        </p>
      )}

      {/* Profile picture */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Profile picture</CardTitle>
          <CardDescription>
            Signed up with Google? Your photo is synced from your Google
            account automatically — you can still replace it here.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex flex-col gap-5 sm:flex-row sm:items-center">
          <Avatar className="size-24 border">
            <AvatarImage src={avatarSrc} alt={user.name || "Profile picture"} />
            <AvatarFallback className="text-2xl">
              {user.name?.charAt(0).toUpperCase() || "U"}
            </AvatarFallback>
          </Avatar>

          <div className="flex flex-col gap-3">
            <div className="flex flex-wrap gap-2">
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
              >
                <CameraIcon />
                Choose picture
              </Button>

              {pendingImage && (
                <>
                  <Button onClick={savePicture} disabled={savingPicture}>
                    <SaveIcon />
                    {savingPicture ? "Saving…" : "Save picture"}
                  </Button>

                  <Button
                    variant="ghost"
                    onClick={() => setPendingImage(null)}
                    disabled={savingPicture}
                  >
                    Discard
                  </Button>
                </>
              )}
            </div>

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP. Max 2 MB — resized to 512 px before saving.
            </p>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Account details */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base font-semibold">Account details</CardTitle>
          <CardDescription>Your name is used on your bookings.</CardDescription>
        </CardHeader>

        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={saveName}>
            <label className="flex flex-col gap-2 text-sm font-medium">
              Full name
              <Input
                value={nameValue}
                onChange={(event) => setName(event.target.value)}
                required
                maxLength={80}
                placeholder="Your full name"
                className="h-11"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium">
              Email
              <Input
                value={user.email}
                readOnly
                disabled
                className="h-11"
              />
            </label>

            <div>
              <Button
                type="submit"
                disabled={savingName || nameValue.trim() === user.name}
              >
                <SaveIcon />
                {savingName ? "Saving…" : "Save name"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
