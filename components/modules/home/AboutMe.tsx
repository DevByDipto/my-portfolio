

const AboutMe =async () => {
    const res = await fetch(`${process.env.BACKEND_URL}/about-me`)
const data = await res.json()
const aboutData = data.data
  return (

   <div>
      <article
        aria-labelledby="about-title"
        className="max-w-xl mx-auto bg-[var(--card)] text-[var(--foreground)] shadow-md rounded-2xl p-6 sm:p-8"
      >
        <header className="mb-4">
          <h2 id="about-title" className="text-lg sm:text-xl font-semibold">
            About Me
          </h2>
        </header>

        {/* Technologies Section */}
        <section className="mb-4" aria-labelledby="tech-title">
          <h3
            id="tech-title"
            className="text-sm font-medium text-[var(--muted-foreground)] mb-2"
          >
            Technologies:
          </h3>

          {aboutData.Technologies && aboutData.Technologies.length > 0 ? (
            <ul className="flex flex-wrap gap-2" role="list">
              {aboutData.Technologies.map((tech, i) => (
                <li key={i}>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[var(--muted)] text-[var(--foreground)] dark:bg-[var(--muted)] dark:text-[var(--foreground)]">
                    {tech}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No technologies listed
            </p>
          )}
        </section>

        {/* Description Section */}
        <section className="mb-4" aria-labelledby="desc-title">
          <h3
            id="desc-title"
            className="text-sm font-medium text-[var(--muted-foreground)] mb-2"
          >
            Description:
          </h3>
          {aboutData.discription ? (
            <p className="text-sm text-[var(--foreground)] whitespace-pre-wrap">
              {aboutData.discription}
            </p>
          ) : (
            <p className="text-sm text-[var(--muted-foreground)]">
              No description provided
            </p>
          )}
        </section>
      </article>
    </div>
  )
}

export default AboutMe