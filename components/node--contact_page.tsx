import { useId } from 'react'
import { DrupalNode } from "next-drupal";
import { FormattedText } from "components/formatted-text";
import { DrupalEntity } from "components/entity";
import Link from 'next/link'
import { Fragment, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'


import { Border } from 'components/Border'
import { Button } from 'components/Button'
import { Container } from 'components/Container'
import { FadeIn } from 'components/FadeIn'
import { Offices } from 'components/Offices'
import { PageIntro } from 'components/PageIntro'
import { SocialMedia } from 'components/SocialMedia'


interface NodeContactPageProps {
  node: DrupalNode;
}

function TextInput({ label, ...props }) {
    let id = useId()

    return (
      <div className="group relative z-0 transition-all focus-within:z-10">
        <input
          type="text"
          id={id}
          {...props}
          placeholder=" "
          className="peer block w-full border border-neutral-300 bg-transparent px-6 pb-4 pt-12 text-base/6 text-neutral-950 ring-4 ring-transparent transition focus:border-neutral-950 focus:outline-none focus:ring-neutral-950/5 group-first:rounded-t-2xl group-last:rounded-b-2xl"
        />
        <label
          htmlFor={id}
          className="pointer-events-none absolute left-6 top-1/2 -mt-3 origin-left text-base/6 text-neutral-500 transition-all duration-200 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:font-semibold peer-focus:text-neutral-950 peer-[:not(:placeholder-shown)]:-translate-y-4 peer-[:not(:placeholder-shown)]:scale-75 peer-[:not(:placeholder-shown)]:font-semibold peer-[:not(:placeholder-shown)]:text-neutral-950"
        >
          {label}
        </label>
      </div>
    )
}

function RadioInput({ label, ...props }) {
    return (
      <label className="flex gap-x-3">
        <input
          type="radio"
          {...props}
          className="h-6 w-6 flex-none appearance-none rounded-full border border-neutral-950/20 outline-none checked:border-[0.5rem] checked:border-neutral-950 focus-visible:ring-1 focus-visible:ring-neutral-950 focus-visible:ring-offset-2"
        />
        <span className="text-base/6 text-neutral-950">{label}</span>
      </label>
    )
}

function ContactForm() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    async function handleSubmit(event) {
        event.preventDefault()

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_DRUPAL_BASE_URL}/webform_rest/submit`,
          {
            method: "POST",
            body: JSON.stringify({
              webform_id: "contact",
              name: event.target.name.value,
              email: event.target.email.value,
              company: event.target.company.value,
              phone: event.target.phone.value,
              message: event.target.message.value,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          }
        )

        if (response.ok) {
            // Show success.
            setIsDialogOpen(true);
            // Reset the form fields
            event.target.reset();
        }

        // Handle error.
      }

      function closeDialog() {
        setIsDialogOpen(false);
    }

    return (
      <FadeIn className="lg:order-last">
        <form onSubmit={handleSubmit}>
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Work inquiries
          </h2>
          <div className="isolate mt-6 -space-y-px rounded-2xl bg-white/50">
            <TextInput
                label="Name"
                type="text"
                id="name"
                name="name"
                autoComplete="name"
            />
            <TextInput
                label="Email"
                type="email"
                id="email"
                name="email"
                autoComplete="email"
            />
            <TextInput
              label="Company"
              type="text"
              id="company"
              name="company"
              autoComplete="organization"
            />
            <TextInput
                label="Phone"
                type="tel"
                id="phone"
                name="phone"
                autoComplete="tel"
            />
            <TextInput
                label="Message"
                id="message"
                name="message"
            />
            <div className="border border-neutral-300 px-6 py-8 first:rounded-t-2xl last:rounded-b-2xl">
              <fieldset>
                <legend className="text-base/6 text-neutral-500">Budget</legend>
                <div className="mt-6 grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <RadioInput label="$25K – $50K" name="budget" value="25" />
                  <RadioInput label="$50K – $100K" name="budget" value="50" />
                  <RadioInput label="$100K – $150K" name="budget" value="100" />
                  <RadioInput label="More than $150K" name="budget" value="150" />
                </div>
              </fieldset>
            </div>
          </div>
          <Button type="submit" className="mt-10">
            Let’s work together
          </Button>
        </form>

        <Transition appear show={isDialogOpen} as={Fragment}>
          <Dialog as="div" className="relative z-10" onClose={closeDialog}>


          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Message sent successfully
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500">
                        Your message has been successfully dispatched into the digital realm.
                        We've pinged your inbox with a confirmation for your records.
                    </p>
                  </div>

                  <div className="mt-4">
                    <Button
                      type="button"
                      onClick={closeDialog}
                    >
                      Understood, thanks!
                    </Button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>

          </Dialog>
        </Transition>

      </FadeIn>
    )
}

function ContactDetails() {
    return (
      <FadeIn>
        <h2 className="font-display text-base font-semibold text-neutral-950">
          Our offices
        </h2>
        <p className="mt-6 text-base text-neutral-600">
          Prefer doing things in person? We don’t but we have to list our
          addresses here for legal reasons.
        </p>

        <Offices className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2" />

        <Border className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Email us
          </h2>
          <dl className="mt-6 grid grid-cols-1 gap-8 text-sm sm:grid-cols-2">
            {[
              ['Careers', 'careers@studioagency.com'],
              ['Press', 'press@studioagency.com'],
            ].map(([label, email]) => (
              <div key={email}>
                <dt className="font-semibold text-neutral-950">{label}</dt>
                <dd>
                  <Link
                    href={`mailto:${email}`}
                    className="text-neutral-600 hover:text-neutral-950"
                  >
                    {email}
                  </Link>
                </dd>
              </div>
            ))}
          </dl>
        </Border>

        <Border className="mt-16 pt-16">
          <h2 className="font-display text-base font-semibold text-neutral-950">
            Follow us
          </h2>
          <SocialMedia className="mt-6" />
        </Border>
      </FadeIn>
    )
}

export const metadata = {
    title: 'Contact Us',
    description: 'Let’s work together. We can’t wait to hear from you.',
}

export function NodeContactPage({ node, ...props }: NodeContactPageProps) {
    return (
    <article {...props}>

      <PageIntro eyebrow={node.title} title={node.headline}>
        {node.description?.processed && (
            <div>
                <FormattedText processed={node.description.processed} />
            </div>
        )}
        {node.text?.processed && (
            <div className="mt-10 max-w-2xl space-y-6 text-base">
                <FormattedText processed={node.text.processed} />
            </div>
        )}
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="grid grid-cols-1 gap-x-8 gap-y-24 lg:grid-cols-2">
          <ContactForm />
          <ContactDetails />
        </div>
      </Container>

    </article>
  );
}
