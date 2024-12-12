import { display_templates } from "./const";

export const Home = () => {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-balance text-4xl font-semibold tracking-tight text-gray-900 sm:text-5xl">
            ReverbMD
          </h2>
          <p className="mt-2 text-lg/8 text-gray-600">
            Custom scutsheets and clinical tools
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {display_templates.map((template) => (
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
          <h2 className="text-xl font-semibold mb-2">Tools</h2>
          <div className="grid grid-cols-1 gap-4">
            <a
              href="/tools/some_tool"
              className="block p-4 bg-white shadow-md rounded-lg hover:bg-gray-100 w-full sm:w-96 mx-auto"
            >
              <h3 className="text-lg font-medium">Tool Name</h3>
              <p className="text-sm text-gray-600">Description of the tool.</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
