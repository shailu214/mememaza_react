import React from 'react'
import styles from '@/styles/components/reel.module.css'
import { useRouter } from 'next/router'

import { API_PATH, HOME_URL } from '@/def'
import { useState } from 'react'
import { postLike } from '@/src/services/post/slice'
import { useAppDispatch } from '@/src/store'

import ActionButton from './ActionButton'
import ShareButton from './ShareButton'

export default function Reel({ reel }) {
  const router = useRouter()
  const {
    id,
    reel: title,
    link,
    image_path,
    likes_count,
    shares_count,
    reel_type,
    comments_count,
    type,
    views_count,
    user_has_liked,
    category,
    slug,
    download: dl,
  } = reel

  const [download, setDownload] = useState(dl)
  const [like, setLike] = useState(user_has_liked)
  const [likeCount, setLikeCount] = useState(likes_count)

  const dispatch = useAppDispatch()

  const newImagePath = image_path.replace('https://admin.', 'https://')
  let media

  if (reel_type == 1) {
    media = (
      <div
        style={{
          minHeight: 300,
          background: '#292839',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 12,
        }}
      >
        {link}
      </div>
    )
  } else {
    media = <img className={styles.reelImage} src={newImagePath} alt={title} />
  }

  const showPlayIcon = (mt) => {
    if (mt === 2) {
      return (
        <i style={{ fontSize: 8, marginLeft: 4 }} className="fas fa-play" />
      )
    }

    return null
  }

  return (
    <div className={styles.reel} role="article">
      <div
        className="position-absolute badge rounded-pill"
        style={{
          width: 'fit-content',
          position: 'absolute',
          background: 'rgb(23, 21, 68)',
          top: 5,
          left: 5,
        }}
      >
        Reel {showPlayIcon(reel_type)}
      </div>
      <div
        className={styles.reelOverlay}
        onClick={() => router.push(`/reel/${slug}`)}
      />
      {media}
      <div className={styles.reelDetails}>
        <p className={styles.reelTitle}>
          {title} • {category.name}
        </p>
        <div className={styles.reelToolbarContainer}>
          <div className={styles.reelToolbar}>
            <ActionButton
              active={like}
              lg
              onClick={(e) => {
                e.preventDefault()
                setLike((like) => !like)
                setLikeCount((lc) => (like ? lc - 1 : lc + 1))
                dispatch(postLike({ id, type }))
              }}
              icon="thumbs-up"
              text={likeCount}
            />
            <ActionButton
              lg
              onClick={() => router.push(`/reel/${slug}`)}
              icon="comment"
              text={comments_count}
            />
            <ActionButton
              lg
              onClick={() => router.push(`/reel/${slug}`)}
              icon="eye"
              text={views_count}
            />

            <a
              style={{ color: 'white' }}
              onClick={() => setDownload((val) => val + 1)}
              href={`${API_PATH}/download?file=${link}&type=Reel&id=${id}`}
              className={`${styles.actionBtn} ${styles.actionBtnLg} `}
            >
              <i className={`fas fa-download`}></i> <>{download}</>
            </a>

            <ShareButton count={shares_count} url={`${HOME_URL}reel/${slug}`} />
          </div>
        </div>
      </div>
    </div>
  )
}
