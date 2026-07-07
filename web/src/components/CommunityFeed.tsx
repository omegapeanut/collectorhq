'use client';

import { useState } from 'react';
import styles from '@/app/community/community.module.css';

export interface Post {
  key: string;
  avatar: string;
  art: string | null;
  user: string;
  leader: boolean;
  time: string;
  tag: string;
  tagBg: string;
  tagFg: string;
  text: string;
  cardLabel: string;
  price: string;
  delta: string;
  deltaColor: string;
  likes: number;
  comments: number;
  tilt: number;
}

export default function CommunityFeed({ posts }: { posts: Post[] }) {
  const [liked, setLiked] = useState<Record<string, boolean>>({});

  return (
    <div className={styles.feed}>
      {posts.map((p) => {
        const isLiked = !!liked[p.key];
        const likes = isLiked ? p.likes + 1 : p.likes;
        return (
          <div key={p.key} className={styles.post} style={{ transform: `rotate(${p.tilt}deg)` }}>
            <div className={styles.postHead}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.avatar} alt="" className={styles.postAvatar} />
              <div style={{ flex: 1 }}>
                <div className={styles.postUser}>
                  {p.user} {p.leader && <span className={styles.leaderBadge}>★ LEADER</span>}
                </div>
                <div className={styles.postTime}>{p.time}</div>
              </div>
              <span className={styles.postTag} style={{ background: p.tagBg, color: p.tagFg }}>
                {p.tag}
              </span>
            </div>
            <div className={styles.postBody}>
              {p.art && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.art} alt="" className={styles.postCardImg} />
              )}
              <div style={{ flex: 1 }}>
                <p className={styles.postText}>{p.text}</p>
                <div className={styles.postPriceTag}>
                  <span className={styles.postCardLabel}>{p.cardLabel}</span>
                  <span className={styles.postPrice}>{p.price}</span>
                  <span className={styles.postDelta} style={{ color: p.deltaColor }}>
                    {p.delta}
                  </span>
                </div>
                <div className={styles.postActions}>
                  <button
                    onClick={() => setLiked((s) => ({ ...s, [p.key]: !s[p.key] }))}
                    className={styles.likeBtn}
                    style={{ color: isLiked ? '#e6392f' : '#4a4238' }}
                  >
                    ♥ {likes}
                  </button>
                  <span>💬 {p.comments}</span>
                  <span>↗ Share</span>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
