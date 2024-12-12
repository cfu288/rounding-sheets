import { display_templates } from "./const";

const gradients = [
  // "from-teal-600/40 via-indigo-800/20",
  "from-violet-600/40 to-indigo-600/20",
  "from-amber-500/40 to-pink-500/20",
  "from-fuchsia-500/40 to-cyan-500/20",
  "from-rose-400/40 to-red-500/20",
  "from-amber-200/40 to-yellow-500/20",
];

export const Home = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            ReverbMD
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Explore our custom scutsheets built to help you stay organized and a
            variety of clinical tools to help fill in the missing feature gaps
            of your EMR.
          </p>
        </div>
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
            Scutsheets
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
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
        <div className="mt-16">
          <div className="mx-auto max-w-2xl lg:mx-0">
            <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-2xl">
              Tools
            </h2>
            <p className="mt-2 text-lg/8 text-gray-600">
              Helpful utilities to get things done.
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
  );
};
