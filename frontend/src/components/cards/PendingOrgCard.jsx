

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
  Pencil,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";




function PendingOrgCard({ organization, onEdit, onDelete, admin }) {

  const navigate = useNavigate();


  const handleDelete = async () => {
    await onDelete(organization._id);
  };

  
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
        onClick={() => navigate(`/${organization.urlID}`)}
        className="bg-white w-[320px] bg-black/30 cursor-pointer rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
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
        <div
          // onClick={() => navigate(`/${organization.urlID}`)}
          className="relative h-30 w-[90%] mx-auto rounded-xl overflow-hidden"
        >
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
          {/* <div className="absolute top-3 right-3">{getStatusBadge()}</div> */}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Logo */}
          <div className="flex items-start relative gap-3 mb-4">
            <div
              // onClick={() => navigate(`/${organization.urlID}`)}
              className="absolute -bottom-5 left-[50%] -translate-x-[50%]"
            >
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
            <p className="-mt-2 text-teal-600">/{organization.urlID}</p>
          </div>

          {organization.needUpdate && (
            <div className="bg-blue-50 opacity-100 rounded-xl p-3 text-center">
              <div>
                <small className="text-gray-600">
                  Your organization is currently not active. please update your
                  information to get back.
                </small>
                <div className="w-full flex justify-center">
                  <button className="flex-1 flex mt-4 items-center cursor-pointer justify-center gap-2 px-4 py-2 bg-blue-200 text-blue-600 rounded-lg hover:bg-blue-300 transition font-semibold text-sm">
                    <Edit size={16} />
                    Update now
                  </button>
                </div>
              </div>
            </div>
          )}

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
              // onClick={() => onEdit(organization)}
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

export default React.memo(PendingOrgCard);
