
// import { Routes, Route } from "react-router-dom";
// import ProtectedRoute from "./ProtectedRoute";
// import PendingPage from "../pages/PendingPage";
// import CreateOrganizationPage from "../pages/CreateOrganizationPage";
// import HomePage from "../pages/HomePage";
// import LoginPage from "../pages/LoginPage";
// import DetailsPage from "../pages/DetailsPage";
// import AdminPage from "../pages/AdminPage";
// import NotFound from "../pages/NotFound";

// export default function AppRoutes() {
//   return (
//     <Routes>
//       <Route path="/login" element={<LoginPage />} />
//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/login" element={<LoginPage />} />
//         <Route path="/" element={<HomePage />} />
//         <Route path="/pending" element={<PendingPage />} />



//         <Route
//           path="/:urlID"
//           element={<DetailsPage />}
//           loader={async ({ params }) => await fetch(`http://localhost:5000/api/organizations/url/${params.urlID}`)}
//           errorElement={<NotFound />}
//         />

//         <Route path="/admin" element={<AdminPage />} />
//         <Route
//           path="/create-organization"
//           element={<CreateOrganizationPage />}
//         />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </Routes>
//   );
// }


        {
          /* <Route path="/:urlID" element={<DetailsPage />} /> */
        }














// // src/AppRoutes.jsx
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
// } from "react-router-dom";

// import ProtectedRoute from "./ProtectedRoute";
// import PendingPage from "../pages/PendingPage";
// import CreateOrganizationPage from "../pages/CreateOrganizationPage";
// import HomePage from "../pages/HomePage";
// import LoginPage from "../pages/LoginPage";
// import AdminPage from "../pages/AdminPage";
// import NotFound from "../pages/NotFound";
// import axiosInstance from "../api/axiosInstance";
// import DetailsPage from "../pages/DetailsPage";

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/login" element={<LoginPage />} />

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/pending" element={<PendingPage />} />

//         <Route
//           path="/:urlID"
//           element={<DetailsPage />}
//           // loader={async ({ params }) => {
//           //   try {
//           //     const { urlID } = params;
//           //     const res = await axiosInstance.get(
//           //       `/organizations/url/${urlID}`
//           //     );
//           //     return res.data.data; // Axios already returns parsed JSON
//           //   } catch (error) {
//           //     throw new Response("Not Found", { status: 404, message: error });
//           //   }
//           // }}
//           // errorElement={<NotFound />}
//         />

//         <Route path="/admin" element={<AdminPage />} />
//         <Route
//           path="/create-organization"
//           element={<CreateOrganizationPage />}
//         />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </>
//   )
// );

// export default function AppRoutes() {
//   return <RouterProvider router={router} />;
// }




















// // AppRoutes.jsx
// import {
//   createBrowserRouter,
//   createRoutesFromElements,
//   Route,
//   RouterProvider,
//   json,       // 👈 for typed JSON responses
//   redirect,   // 👈 for auth redirects
// } from "react-router-dom";
// import axiosInstance from "../api/axiosInstance";
// // ...your other imports

// const router = createBrowserRouter(
//   createRoutesFromElements(
//     <>
//       <Route path="/login" element={<LoginPage />} />

//       {/* Protected Routes */}
//       <Route element={<ProtectedRoute />}>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/pending" element={<PendingPage />} />

//         <Route
//           path="/:urlID"
//           element={<DetailsPage />}
//           loader={async ({ params, request }) => {
//             const { urlID } = params;

//             try {
//               const res = await axiosInstance.get(
//                 `/organizations/url/${urlID}`,
//                 { signal: request.signal } // ✅ allow cancellation
//               );

//               // adjust to match your API shape
//               return res.data?.data ?? null;
//             } catch (err) {
//               // If you have auth in axios interceptors, this may already be handled.
//               // But you can still check status here as a guard:
//               const status = err?.response?.status;

//               // Unauthorized? bounce to login and preserve where we came from
//               if (status === 401) {
//                 const from = new URL(request.url).pathname;
//                 throw redirect(`/login?from=${encodeURIComponent(from)}`);
//               }

//               // Not found -> surface a proper 404 with JSON payload
//               if (status === 404) {
//                 throw json({ message: "Organization not found." }, { status: 404 });
//               }

//               // Unknown error -> let a boundary show a generic message
//               throw json(
//                 { message: "Something went wrong fetching organization." },
//                 { status: 500 }
//               );
//             }
//           }}
//           errorElement={<NotFound />} // 👈 this component can read the error via useRouteError()
//           // Optional: only refetch when the :urlID actually changes
//           shouldRevalidate={({ currentParams, nextParams }) =>
//             currentParams.urlID !== nextParams.urlID
//           }
//         />

//         <Route path="/admin" element={<AdminPage />} />
//         <Route path="/create-organization" element={<CreateOrganizationPage />} />
//       </Route>

//       <Route path="*" element={<NotFound />} />
//     </>
//   )
// );

// export default function AppRoutes() {
//   return <RouterProvider router={router} />;
// }
















// src/routes/AppRoutes.jsx
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";



import ProtectedRoute from "./ProtectedRoute";
import PendingPage from "../pages/PendingPage";
import CreateOrganizationPage from "../pages/CreateOrganizationPage";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import DetailsPage from "../pages/DetailsPage";
import AdminPage from "../pages/admin-page/AdminPage";
import NotFound from "../pages/NotFound";
import EditOrganizationPage from "../pages/EditOrganizationPage";
import MadrashaPage from "../pages/MadrashaPage";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/madrasha" element={<MadrashaPage />} />

        <Route path="/pending" element={<PendingPage />} />

        <Route
          path="/:urlID"
          element={<DetailsPage />}
          loader={async ({ params }) => {
            const res = await fetch(
              `http://localhost:5000/api/organizations/url/${params.urlID}`
            );

            if (!res.ok) {
              // throw json({ message: "Not Found" }, { status: 404 });
              throw new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
              });
            }

            const data = await res.json();
            return data.data;
          }}
          errorElement={<NotFound />}
        />

        <Route
          path="/edit-organization"
          element={<EditOrganizationPage />}
          errorElement={<NotFound />}
        />

        {/* <Route
          path="/edit-organization/:urlID"
          element={<EditOrganizationPage />}
          loader={async ({ params }) => {
            const res = await fetch(
              `http://localhost:5000/api/organizations/edit/${params.urlID}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(params.urlID),
              }
            );

            if (!res.ok) {
              throw new Response(JSON.stringify({ message: "Not Found" }), {
                status: 404,
                headers: { "Content-Type": "application/json" },
              });
            }

            const data = await res.json();
            return data.data;
          }}
          action={async ({ request, params }) => {
            const formData = await request.formData();
            const updatedData = Object.fromEntries(formData);

            const res = await fetch(
              `http://localhost:5000/api/organizations/edit/${params.urlID}`,
              {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedData),
              }
            );

            if (!res.ok) {
              throw new Response(
                JSON.stringify({ message: "Failed to update" }),
                {
                  status: 400,
                  headers: { "Content-Type": "application/json" },
                }
              );
            }

            // return redirect("/organizations");
          }}
          errorElement={<NotFound />}
        /> */}

        <Route path="/admin" element={<AdminPage />} />
        <Route
          path="/create-organization"
          element={<CreateOrganizationPage />}
        />
      </Route>

      {/* 404 fallback */}
      <Route path="*" element={<NotFound />} />
    </>
  )
);

export default function AppRoutes() {
  return <RouterProvider router={router} />; // ✅ data router in use
}















