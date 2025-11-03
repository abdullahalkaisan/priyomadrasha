

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
  AtSign,
  Bookmark,
  BookmarkCheck,
  PinIcon,
  Home,
  MoreHorizontal,
  MoreVerticalIcon,
  MoreHorizontalIcon,
  CircleEllipsis,
  CircleEllipsisIcon,
} from "lucide-react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Chip, IconButton } from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import FavoriteBorder from "@mui/icons-material/FavoriteBorder";
import Favorite from "@mui/icons-material/Favorite";


function OrgCard({ organization, onEdit, onDelete, admin }) {
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
      <div className="bg-white w-[320px] rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        {/* Cover Image */}
        <div
          onClick={() => navigate(`/${organization.urlID}`)}
          className="relative h-30  w-[90%] mx-auto mt-4 rounded-xl overflow-hidden"
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

          {/* {organization.isEdited && (
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
            <div
              onClick={() => navigate(`/${organization.urlID}`)}
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
            {/* <p className="-mt-2 text-teal-600">/{organization.urlID}</p> */}
            {/* <p className="line-clamp-2 text-gray-600">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae
              numquam expedita iste harum quod aspernatur id repellendus non
              tenetur esse perspiciatis quos doloremque placeat, voluptatibus
              tempore saepe dignissimos, in dolores.
            </p> */}
          </div>

          <ul className="space-y-2 mb-4">
            <li className="flex items-start space-x-2">
              <MapPin
                size={14}
                color="royalblue"
                className="mt-0.5 flex-shrink-0"
              />
              <small className="text-gray-700 line-clamp-2">
                {/* {`${organization.localAddress}, ${organization.city}, ${organization.zipCode}`} */}

                {organization?.upazila && `${organization?.upazila?.bn_name}, `}
                {organization?.district &&
                  `${organization?.district?.bn_name}, `}
                {organization?.division &&
                  `${organization?.division?.bn_name}, `}
                {organization?.zipCode && `${organization?.zipCode}`}
                {organization?.localAddress &&
                  `, (${organization?.localAddress})`}
              </small>
            </li>
            <li className="flex items-center space-x-2">
              <Phone size={14} color="royalblue" className="flex-shrink-0" />
              <small className="text-gray-700"> {organization.phone}</small>
            </li>
            <li className="flex items-center space-x-2">
              <AtSign size={14} color="royalblue" className="flex-shrink-0" />
              <small className="text-gray-700 truncate">
                {organization.orgEmail}
              </small>
            </li>
            <li className="flex items-center space-x-2">
              <Home size={14} color="royalblue" className="flex-shrink-0" />
              <small className="text-gray-700 truncate">{"আবাসিক "}</small>
            </li>
          </ul>

          <div className="flex gap-2 mb-4 flex-wrap">
            <Chip label="কিন্ডার গার্ডেন" />
            <Chip label="নূরানী" />
            <Chip label="হিফজ" />
            <Chip label="কিতাব খানা" />
          </div>

          {/* Gallery Preview */}
          {organization.galleryUrls?.length > 0 && (
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
                    className="w-16 h-16 object-cover rounded cursor-pointer flex-shrink-0"
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
          )}

          {/* Actions */}
          <div className="flex justify-between gap-2 pt-2  border-gray-200">
            <div className="flex items-center">

                {/* <IconButton>
                  <CircleEllipsisIcon  />
                </IconButton> */}


              <Checkbox
                icon={<FavoriteBorder className="text-rose-400" />}
                checkedIcon={<Favorite className="text-rose-600" />}
              />
            </div>

            <button
              onClick={() => navigate(`/${organization.urlID}`)}
              className="bg-teal-600 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white px-4 py-1.5 cursor-pointer rounded-full transition-colors flex items-center space-x-1"
            >
              {/* <Edit size={14} /> */}
              <span>বিস্তারীত</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default React.memo(OrgCard);
