import { display_templates } from "../const";

const gradients = [
  // "from-teal-600/40 via-indigo-800/20",
  "from-amber-500/40 to-pink-500/20",
  "from-fuchsia-500/40 to-cyan-500/20",
  "from-rose-400/40 to-red-500/20",
  "from-violet-600/40 to-indigo-600/20",
  // "from-amber-200/40 to-yellow-500/20",
];

export const Home = () => {
  return (
    <div className="bg-white">
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        >
          <div
            style={{
              clipPath:
                "polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)",
            }}
            className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          />
        </div>

        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center my-16 sm:my-24">
            <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
              ReverbMD
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Clinical tools to help fill in the missing feature gaps of your
              EMR and custom scutsheets built to help you stay organized on
              rounds
            </p>
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
            >
              <div
                style={{
                  clipPath:
                    "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                }}
                className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]"
              />
            </div>
          </div>
          <div className="my-16">
            <div className="border-b border-gray-200 pb-5">
              <h3 className="text-base font-semibold text-gray-900">
                Scutsheets
              </h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Use one of our premade scutsheets to help you stay organized, or
                customize a template to make it your own.
              </p>
            </div>
            <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              {display_templates.map((template, index) => (
                <article
                  key={template.templateId}
                  className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                  <img
                    alt={template.templateName}
                    src={template.imagePreview}
                    className="absolute inset-0 -z-10 size-full object-cover"
                  />
                  <div className="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40" />
                  <div
                    className={`absolute inset-0 -z-10 bg-gradient-to-br ${
                      gradients[index % gradients.length]
                    }`}
                  />
                  <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  <h3 className="mt-3 text-lg/6 font-semibold text-white">
                    <a href={`/scutsheet/${template.templateId}`}>
                      <span className="absolute inset-0" />
                      {template.templateName}
                    </a>
                  </h3>
                  <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300">
                    {template.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
          <div className="my-16">
            <div className="border-b border-gray-200 pb-5">
              <h3 className="text-base font-semibold text-gray-900">Tools</h3>
              <p className="mt-2 max-w-4xl text-sm text-gray-500">
                Helpful utilities to get things done
              </p>
            </div>
            <div className="mx-auto grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-8 lg:mx-0 lg:max-w-none lg:grid-cols-3">
              <article className="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80">
                <div
                  className={`absolute inset-0 -z-10 bg-gradient-to-t ${
                    gradients[Math.floor(Math.random() * gradients.length)]
                  }`}
                />
                <div className="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                <h3 className="mt-3 text-lg/6 font-semibold text-white">
                  <a href="/tools/some_tool">
                    <span className="absolute inset-0" />
                    Tools are coming soon!
                  </a>
                </h3>
                <p className="mt-5 line-clamp-3 text-sm/6 text-gray-300"></p>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
