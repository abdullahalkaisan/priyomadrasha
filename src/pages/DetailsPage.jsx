
import { AtSign, MapPin, Phone } from "lucide-react";
// import { useEffect, useLayoutEffect, useMemo, useState } from "react";
import BackButton from "../components/buttons/BackButton";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useMemo } from "react";
import { Button, Chip } from "@mui/material";
import { useOrganizationStore } from "../store/useOrganizationStore";
import toast from "react-hot-toast";

// import Logo from "../components/Logo";
// import { useParams } from "react-router-dom";
// import { useOrganizationStore } from "../store/useOrganizationStore";

// const defaultOrg = {
//   name: "Acme Foundation",
//   urlID: "acme-foundation",
//   orgEmail: "hello@acme.org",
//   phone: "+1 (415) 555-0137",
//   localAddress: "123 Market St",
//   city: "San Francisco, CA",
//   zipCode: "94103",
//   mapLink: "", // optional; if empty we compute from address
//   details:
//     "Acme Foundation is a community-led nonprofit focused on equitable urban spaces, literacy, and local arts.\n\nOur programs include youth mentorship, creative coding, and city cleanups. Volunteers are always welcome.",
//   logoUrl:
//     "https://scontent.fdac37-1.fna.fbcdn.net/v/t39.30808-6/527769334_1282649593575407_5791088191388393231_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=5jxaUNjZLMMQ7kNvwGVzL29&_nc_oc=Adm0ip35Bsmn0xaKzeeCNPjZaWSgqq7114aEVQe0eubFkMdSiQDilW6S2HC_Q9wha5Y&_nc_zt=23&_nc_ht=scontent.fdac37-1.fna&_nc_gid=L0l0VgNfeghBHso39M4jKA&oh=00_Afc4pKvgrZTmuBYj0MPQGrh0V9JVK04SJM5h_V6XpHzCeA&oe=6903DC6A",
//   coverUrl:
//     "https://scontent.fdac37-1.fna.fbcdn.net/v/t39.30808-6/557596760_1332162051957494_7425292756688123075_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=tAX-qzK56FYQ7kNvwFoVmOg&_nc_oc=Adn4aXHLwD8HVuXYVbstHIDmWs-N6OnoX8dlVCB-muHgyB3oIDtV-MHMo1hb8YhASSQ&_nc_zt=23&_nc_ht=scontent.fdac37-1.fna&_nc_gid=38sZZJfNKfOFyTRj3Q8bAQ&oh=00_AfcjrxXXDAhYtysaaZR7SPXBXLjrjFMNoGFSAVWCmGwRkQ&oe=6903DA9F",
//   galleryUrls: [
//     "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1200&auto=format&fit=crop",
//     "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=1200&auto=format&fit=crop",
//   ],
// };

// // --- helpers ---
// const initials = (s) =>
//   (s || "")
//     .split(/\s+/)
//     .filter(Boolean)
//     .slice(0, 2)
//     .map((p) => p[0].toUpperCase())
//     .join("");

const normalizeGallery = (g) => {
  if (!g) return [];
  if (Array.isArray(g)) return g.filter(Boolean);
  if (typeof g === "string")
    return g
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);
  return [];
};




const DetailsPage = () => {

const item = useLoaderData();
console.log(item);

const {
  _id,
  city,
  coverUrl,
  residencyType,
  checkBoxValues,
  division,
  district,
  upazila,

  createdAt,
  details,
  emailUser,
  galleryUrls,
  localAddress,
  logoUrl,
  mapLink,
  name,
  orgEmail,
  phone,
  updatedAt,
  urlID,
  zipCode,
  isRejected,
  isActive,
} = item;






    const fullAddress = useMemo(
      () =>
        [localAddress, upazila.name, district.name, division.name, zipCode]
          .filter(Boolean)
          .join(", "),
      [upazila, district, division, zipCode, localAddress]
    );


    const gallery = useMemo(
      () => normalizeGallery(galleryUrls),
      [galleryUrls]
    );


    const mapEmbedSrc = useMemo(
      () =>
        mapLink?.trim()
          ? mapLink
          : `https://www.google.com/maps?q=${encodeURIComponent(
              fullAddress
            )}&output=embed`,
      [mapLink, fullAddress]
    );


      const mapsLink = mapLink?.trim()
        ? mapLink
        : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            fullAddress
          )}`;



  const navigate = useNavigate()

  const {
    approveOrganization,
    rejectOrganization,
    loading,
    setSelectedOrganizationID,
  } = useOrganizationStore();

    const handleApprove = async () => {
      await approveOrganization(_id);
      // alert("Organization approved!");
      toast.success("Organization has been approved!")
      navigate(-1)
    };

    const handleReject = async () => {
      await rejectOrganization(_id);
      // alert("Organization approved!");
      toast.error("Organization has been rejected!");
      navigate(-1);
    };


  return (
    <div className="bg-white text-slate-900 antialiased">
      {/* JSON-LD for SEO */}
      <script
        type="application/ld+json"
        // dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Sticky Top Bar */}
      {/* bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60  */}
      <header className="sticky top-0 z-50 border-b bg-white border-slate-200/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex gap-3">
            <BackButton />
            {/* <Logo /> */}
            {/* <a href="#" className="group inline-flex items-center gap-3">
              <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 font-semibold text-white">
                {initials(org.name)}
              </div>
              <div>
                <div className="text-sm font-semibold tracking-tight">
                  {org.name}
                </div>
                <div className="text-xs text-slate-500 transition group-hover:text-slate-700">
                  {[org.city, org.zipCode].filter(Boolean).join(" • ")}
                </div>
              </div>
            </a> */}
            {/* <nav className="hidden items-center gap-6 md:flex ml-6">
              <a
                href="#about"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                About
              </a>
              <a
                href="#gallery"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Gallery
              </a>
              <a
                href="#contact"
                className="text-sm text-slate-600 hover:text-slate-900"
              >
                Contact
              </a>
            </nav> */}
          </div>

          <div className="flex items-center gap-2">
            <Button
              onClick={async () => {
                await setSelectedOrganizationID(_id);
                navigate(`/edit-organization/`);
              }}
            >
              Edit
            </Button>

            {!isRejected && (
              <Button onClick={handleReject} color="error">
                {loading ? "Rejecting" : "Reject"}
              </Button>
            )}

            {!isActive && (
              <Button
                onClick={handleApprove}
                sx={{ borderRadius: 2, backgroundColor: "#" }}
                variant="contained"
                size="small"
              >
                {loading ? "Approving" : "Approve"}
                {/* Approve */}
              </Button>
            )}

            {/* <button
              //   onClick={share}
              className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-slate-300 bg-white px-3 py-1.5 text-sm font-medium text-slate-700 shadow-sm hover:bg-slate-50 active:scale-[.99]"
            >
              <svg
                width="16"
                height="16"
                fill="none"
                viewBox="0 0 24 24"
                className="opacity-80"
              >
                <path
                  stroke="currentColor"
                  strokeWidth="1.5"
                  d="M8 12l8-5m-8 5l8 5M8 12h0M17 7a3 3 0 10-2.999-3A3 3 0 0017 7zm0 17a3 3 0 10-3-2.999A3 3 0 0017 24zm-10-6a3 3 0 10-3-2.999A3 3 0 007 18z"
                />
              </svg>
              Share
            </button> */}
            {/* Theme toggle removed to enforce always-light */}
          </div>
        </div>
      </header>

      {/* <div className="w-full flex justify-center mt-12 mb-6">
        <div
          className="h-[400px] w-[800px] rounded-2xl  from-slate-900 via-slate-700 to-slate-500 [background-position:center] [background-size:cover]"
          style={
            org.coverUrl
              ? { backgroundImage: `url('${org.coverUrl}')` }
              : undefined
          }
        />
      </div> */}
      {/* 
      <div className="grid h-34 w-34 cursor-pointer place-items-center overflow-hidden rounded-full border-8 border-white absolute -top-20 left-[50%] -translate-x-[50%] bg-slate-900 text-xl font-semibold text-white ring-1 ring-black/5">
        {org.logoUrl ? (
          <img
            src={org.logoUrl}
            className="h-full w-full object-cover "
            alt={`${org.name} logo`}
          />
        ) : (
          initials(org.name || "Org")
        )}
      </div> */}

      {/* Hero / Cover */}

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 pb-16 pt-10 sm:px-6 lg:px-8">
        <div className="">
          {/* About / Details */}
          <section id="about" className="lg:col-span-2 scroll-mt-24">
            <div className="relative mb-18">
              <div className="h-[500px] overflow-hidden">
                <img
                  className="object-cover h-full w-full rounded-2xl cursor-pointer"
                  src={coverUrl}
                  alt="Cover"
                />
              </div>
              <div className="absolute -bottom-20 left-[50%] -translate-x-[50%] h-[150px] w-[150px] border-8 border-white rounded-full overflow-hidden">
                <img
                  className="object-cover h-full w-full rounded-2xl cursor-pointer"
                  src={logoUrl}
                  alt="Logo"
                />
              </div>
            </div>

            <article className="rounded-2xl  text-center border-slate-200 bg-white p-6 leading-relaxed text-slate-700 ">
              <h1 className="text-xl font-semibold tracking-tight md:text-2xl">
                {name}
              </h1>
              <h1 className="text-teal-700 font-semibold tracking-tight mb-6">
                /{urlID}
              </h1>

              {/* <h2 className="mb-4 text-lg font-semibold">About</h2> */}
              {details || "No description available."}

              <div className="flex w-full gap-3 justify-center mt-6">
                <span className="inline-flex cursor-pointer hover:bg-gray-50 items-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1">
                  <MapPin size={16} />
                  <span>
                    {/* {`${upazila.bn_name}, ${district.bn_name}, ${division.bn_name}, ${zipCode}`} */}
                    {/* {[upazila, district, division, zipCode]
                      .filter(Boolean)
                      .join(", ") || "—"} */}
                    {upazila && `${upazila.bn_name}, `}
                    {district && `${district.bn_name}, `}
                    {division && `${division.bn_name}, `}
                    {zipCode && `${zipCode}`}
                    {localAddress && `, (${localAddress})`}
                  </span>
                </span>

                <button
                  // onClick={() => phone && copy(phone)}
                  className="inline-flex cursor-pointer items-center gap-1 rounded-full border border-slate-300 bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  <Phone size={16} />
                  <span>{phone || "—"}</span>
                </button>

                <button
                  // onClick={() => orgEmail && copy(orgEmail)}
                  className="inline-flex items-center gap-1 rounded-full border border-slate-300 cursor-pointer bg-white px-2.5 py-1 hover:bg-slate-50"
                >
                  <AtSign size={16} />
                  <span>{orgEmail || "—"}</span>
                </button>
              </div>
            </article>
            {residencyType}
            {checkBoxValues.map((item, index)=> <Chip key={index} label={item}/>)}

            {/* Gallery */}
            <section id="gallery" className="mt-10 bg-white p-6 rounded-2xl ">
              <div className=" mb-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">Gallery</h2>
                <span className="text-sm text-slate-500">
                  {galleryUrls.length
                    ? `${galleryUrls.length} photos`
                    : "No photos yet"}
                </span>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
                {galleryUrls.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    // onClick={() => setLightboxSrc(src)}
                    className="group relative overflow-hidden rounded-xl bg-white  focus:outline-none "
                  >
                    <figure className="aspect-[4/3]">
                      <img
                        src={src}
                        alt={`Gallery image ${i + 1}`}
                        className="h-full w-full object-cover transition cursor-pointer"
                      />
                    </figure>
                  </button>
                ))}
              </div>
            </section>

            {/* Map */}
            <div className="mt-8">
              <div className="overflow-hidden  rounded-2xl  border-slate-200 bg-white ">
                {/* <h3 className="mb-4 text-base font-semibold">Location</h3> */}
                <iframe
                  title="Location map"
                  src={mapEmbedSrc}
                  className="h-[340px] w-full rounded-2xl"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50/60 px-4 py-3 text-sm">
                  <span className="truncate">{fullAddress || "—"}</span>
                  <a
                    href={mapsLink}
                    target="_blank"
                    rel="noopener"
                    className="rounded-md px-3 py-1.5 font-medium text-slate-700 hover:underline"
                  >
                    View in Maps →
                  </a>
                </div>
              </div>
            </div>

            {/* Status */}
            <div className="mt-8 hidden">
              <div className="overflow-hidden p-6 rounded-2xl border border-slate-200 bg-white shadow">
                <h3 className="mb-4 text-base font-semibold">Seat status </h3>
                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr className="text-gray-900">
                        <th></th>
                        <th>Name</th>
                        <th>Job</th>
                        <th>Favorite Color</th>
                      </tr>
                    </thead>
                    <tbody>
                      {/* row 1 */}
                      <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                      </tr>
                      {/* row 2 */}
                      <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                      </tr>
                      {/* row 3 */}
                      <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* Contact CTA */}
        <section id="contact" className="scroll-mt-24 hidden">
          <div className="mt-12 rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-900 to-slate-700 p-6 text-white shadow">
            <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
              <div>
                <h3 className="text-lg font-semibold">Get in touch</h3>
                <p className="mt-1 text-sm opacity-80">
                  We’d love to hear from you. Reach out by email or phone.
                </p>
              </div>

              <div className="flex w-full flex-col items-stretch gap-2 sm:w-auto sm:flex-row">
                <a
                  //   href={telHref}
                  className="w-12 h-12 bg-gray-600 hover:bg-gray-700 transition   cursor-pointer  flex justify-center items-center p-3 rounded-full"
                >
                  <Phone color="#98FB98" />
                </a>

                <a
                  //   href={mailHref}
                  className="w-12 h-12 bg-gray-600 hover:bg-gray-700 transition   cursor-pointer  flex justify-center items-center p-3 rounded-full"
                >
                  <AtSign color="#98FB98" />
                </a>

                <a
                  target="_blank"
                  //   href={mapsLink}
                  className="w-12 h-12 bg-gray-600 hover:bg-gray-700 transition   cursor-pointer  flex justify-center items-center p-3 rounded-full"
                >
                  <MapPin color="#98FB98" />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      {/* Lightbox */}
      {/* {lightboxSrc && ( */}

      {/* )} */}
      {/* Toast */}
      {/* {toast && (
        <div
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed inset-x-0 bottom-6 z-[70] mx-auto w-fit rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white shadow-lg"
        >
          {toast}
        </div>
      )} */}
    </div>
  );
};

export default DetailsPage;
