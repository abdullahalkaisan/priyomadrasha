






import React from "react";
import {
  Calendar,
  Mail,
  MapPin,
  Phone,
  Edit,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  CalendarDays,
  Pencil,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { timeAgo } from "../../utils/timeAgo";




function AdminOrgCard({ organization, currentTab, onEdit, onDelete,  }) {


  const handleDelete = async () => {
    await onDelete(organization._id);
  };


  const navigate = useNavigate()

  const getStatusBadge = () => {
    if (organization.isPending)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-yellow-200 cursor-pointer text-yellow-800 rounded-full text-xs font-semibold">
          <Clock size={14} /> Pending
        </span>
      );
    if (organization.isActive)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-200 cursor-pointer text-green-800 rounded-full text-xs font-semibold">
          <CheckCircle size={14} /> Active
        </span>
      );
    if (organization.isRejected)
      return (
        <span className="inline-flex items-center gap-1 px-3 py-1 bg-red-200 cursor-pointer text-red-800 rounded-full text-xs font-semibold">
          <XCircle size={14} /> Rejected
        </span>
      );
  };

  return (
    <>
      <div
        onClick={() =>
          // window.open(`/${organization.urlID}`, "_blank")
          navigate(`/${organization.urlID}`)
        }
        className="bg-white w-[320px] cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
      >
        <div className="flex items-center m-3 gap-2 ">
          {getStatusBadge()}
          {organization.isEdited && (
            <div className="">
              <div className="flex gap-1 items-center px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                <Pencil size={14} />
                Edited
              </div>
            </div>
          )}
        </div>

        {/* Cover Image */}
        <div className="relative h-30 w-[90%] mx-auto rounded-xl overflow-hidden">
          <LazyLoadImage
            src={organization.coverUrl}
            alt={organization.name}
            effect="blur" // 🔥 blur placeholder
            threshold={100}
            width="100%"
            height="100%"
            className="w-full h-full object-cover cursor-pointer"
            placeholder={<Skeleton height={120} />}
          />
          {/* <div className="absolute top-3 right-3">{getStatusBadge()}</div>
          {organization.isEdited && (
            <div className="absolute top-3 left-3">
              <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-semibold">
                Edited
              </span>
            </div>
          )} */}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Logo */}
          <div className="flex items-start relative gap-3 mb-4">
            <div className="absolute -bottom-5 left-[50%] -translate-x-[50%]">
              <LazyLoadImage
                src={organization.logoUrl}
                alt={`${organization.name} logo`}
                effect="blur"
                threshold={100}
                width={96}
                height={96}
                className="w-24 h-24  rounded-full cursor-pointer object-cover border-6 border-white"
                placeholder={<Skeleton height={120} />}
              />
            </div>
          </div>

          <div className="flex-1 mt-2 mb-4 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {organization.name}
            </h3>
            {/* <p className="-mt-2 text-teal-600">/{organization.urlID}</p> */}
          </div>

          <div>
            <p className=" text-gray-600 flex items-center gap-3">
              <div>
                <MapPin size={18} />
              </div>
              {/* {`${organization.localAddress}, ${organization.city}, ${organization.zipCode}`} */}
              {organization?.upazila && `${organization?.upazila?.bn_name}, `}
              {organization?.district && `${organization?.district?.bn_name}, `}
              {organization?.division && `${organization?.division?.bn_name}, `}
              {organization?.zipCode && `${organization?.zipCode}`}
              {organization?.localAddress &&
                `, (${organization?.localAddress})`}
            </p>
          </div>

          <div className="">
            {/* Accent bar */}
            {/* Content */}
            <div className="pt-2 text-center flex items-center gap-3">
              <CalendarDays size={18} className="text-amber-700" />
              <h1 className="text-sm font-semibold text-gray-800">
                <span className="text-amber-700 font-medium">
                  {new Date(organization.createdAt).toLocaleDateString(
                    "en-US",
                    {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    }
                  )}
                </span>
              </h1>

              <p className=" text-sm text-gray-500 flex items-center justify-center gap-1">
                {timeAgo(organization.createdAt)}
              </p>
            </div>
          </div>

          {/* Gallery Preview */}
          {/* {organization.galleryUrls?.length > 0 && (
            <div className="mb-4">
              <p className="text-xs text-gray-500 mb-2">
                Gallery ({organization.galleryUrls.length} images)
              </p>
              <div className="flex flex-wrap gap-2 overflow-hidden">
                {organization.galleryUrls.slice(0, 4).map((url, index) => (
                  <LazyLoadImage
                    key={index}
                    src={url}
                    alt={`Gallery ${index + 1}`}
                    effect="blur"
                    threshold={100}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-cover rounded flex-shrink-0"
                    placeholder={<Skeleton height={120} />}
                  />
                ))}
                {organization.galleryUrls.length > 4 && (
                  <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                    <span className="text-xs text-gray-600 font-semibold">
                      +{organization.galleryUrls.length - 4}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )} */}

          {/* Actions */}
          {/* <div className="flex gap-2 pt-4 border-t border-gray-200">
            <button
              onClick={() => onEdit(organization)}
              className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition font-semibold text-sm"
            >
              <Edit size={16} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="flex-1 flex items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition font-semibold text-sm"
            >
              <Trash2 size={16} />
              Delete
            </button>
          </div> */}
        </div>
      </div>
    </>
  );
}

export default React.memo(AdminOrgCard);
