import { cities, services, site } from "@/lib/site";

export function GET() {
  const body = `# Graham's Wash

> Locally owned exterior cleaning in Rocklin, California. Hot pressure washing, solar panel cleaning, trash bin cleaning, and permanent Christmas lights for Rocklin and the Greater Sacramento area.

- Website: ${site.url}
- Contact: ${site.url}/contact
- Email: ${site.email}
- Phone: ${site.phone}
- Owner: Graham
- Google: ${site.googleMapsUrl}
- Instagram: ${site.social.instagram}

Graham is a one-person local operator based in Rocklin, CA. Quotes are requested through the website contact form. Customers can ask to be contacted by text, call, or email.

## Services

${services
  .map(
    (s) => `### ${s.name}
${s.longDescription}
- Page: ${site.url}${s.href}
- Quote: ${site.url}/contact?service=${s.slug}`,
  )
  .join("\n\n")}

## Service area

${site.serviceAreaLabel}. Cities: ${cities.join(", ")}.

## Key pages

- Home: ${site.url}/
- Services: ${site.url}/services
- Pressure washing: ${site.url}/services/pressure-washing
- Solar panel cleaning: ${site.url}/services/solar-panel-cleaning
- Trash bin cleaning: ${site.url}/services/trash-bin-cleaning
- Permanent Christmas lights: ${site.url}/services/permanent-christmas-lights
- Before & after results: ${site.url}/results
- Google reviews: ${site.url}/reviews
- Service areas: ${site.url}/service-areas
- About: ${site.url}/about
- FAQ: ${site.url}/faq
- Contact / request a quote: ${site.url}/contact

## Notes for assistants

- There is no online checkout. The conversion path is the contact form.
- Preferred public contact is the form, then ${site.phone} or ${site.email}.
- Permanent holiday lights previously lived at /holiday-lights and now redirect to /services/permanent-christmas-lights.
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
