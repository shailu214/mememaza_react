import React from "react";

import styles from "@/styles/components/gallery.module.css";
import { ActionButton } from "./Post";
import { useEffect } from "react";
import { useState } from "react";
import UserHistory from "./UserHistory";
import Link from "next/link";
import { HOME_URL } from "@/def";
import ShareButton from "./ShareButton";

export default function Gallery({
  media,
  title,
  loading,
  likes,
  isLiked,
  onLike,
  shares_count,
  slug,
  onDislike,
  timeAgo,
  type,
  previousLink,
  nextLink,
  mediaType = "photo",
}) {
  const [icon, setIcon] = useState("vr-dashboard");

  useEffect(() => {
    if (type) {
      if (type == "reel") {
        setIcon("vr-cardboard");
      } else if (type == "story") {
        setIcon("cloud-moon");
      } else {
        setIcon("newspaper");
      }
    }
  }, [type]);

  const actionButtonStyle = {
    color: "#b0b3b8ae",
    hoverColor: "#eeaeae",
    lg: true,
  };

  const [showCommentBox, setCommentBoxShow] = useState(false)

  console.log(showCommentBox)

  return (
    <div className={styles.gallery}>
      {showCommentBox ?
      <div className={styles.blurredBackdrop}></div>
    : null}
      <div className={styles.mediaContainer}>
        {loading ? (
          <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
          </div>
        ) : (
          media
        )}
        {
          previousLink && <Link href={previousLink} className={styles.navLink + " " + styles.previousLink}>
            <i className="fas fa-chevron-left" />
            
          </Link>
        }
        {
          nextLink && <Link href={nextLink} className={styles.navLink + " " + styles.nextLink}>
            <i className="fas fa-chevron-right" />
          </Link>
        }
      </div>
      <div className={`${styles.dataContainer} ${showCommentBox ? styles.showCommentBox : ''}`}>
        <div role="button" onClick={() => setCommentBoxShow(scb => !scb)} className={styles.dataContainerChevron}>
          <i className={`fas fa-chevron-${showCommentBox ? 'down' : 'up'}`} />
        </div>
        <div className={styles.infoContainer}>
          <p className={styles.info}>
            <i className={`fa fa-${icon}`} /> This {mediaType} is from a {type}.
          </p>
        </div>
        {loading ? (
          <div className={styles.titleContainer}>
            <div class="spinner-border" role="status">
              <span class="sr-only">Loading...</span>
            </div>
          </div>
        ) : (
          <>
            <div className={styles.titleContainer}>
              <UserHistory
                avatar="https://picsum.photos/id/7/100/100.webp"
                name="Admin"
                timeAgo={timeAgo}
              />
              {title}
            </div>
            <div className={styles.toolbarContainer}>
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {
                  if (isLiked) {
                    onDislike();
                  } else {
                    onLike();
                  }
                }}
                icon="thumbs-up"
                active={isLiked}
                text="Like"
              />
              <ActionButton
                {...actionButtonStyle}
                onClick={() => {}}
                icon="comment"
                text="Comment"
              />

              <ShareButton  {...actionButtonStyle} count={"Share"} url={`${HOME_URL}${type}/${slug}`}>Share</ShareButton>

            </div>
            <div className={styles.commentContainer}>
              <div className={styles.commentBoxContainer}>
                <textarea className={styles.commentBox} />
                <ActionButton
                  style={{ height: "fit-content" }}
                  onClick={() => {}}
                  icon="paper-plane"
                  text="Send"
                  lg
                />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
