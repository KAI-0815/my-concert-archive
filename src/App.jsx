import "./App.css"
import { useEffect, useState } from "react"

const initialConcerts = [
    {   "artist": "黄丽玲",
        "city": "大连",
        "date": "2026-05-03",
        "venue": "大连体育中心体育馆",
        "image":"/tickets/1.jpg",
        "id": 1789277018632,
        "rating": 5
    },
    {
        "artist": "袁娅维",
        "city": "北京",
        "date": "2026-03-21",
        "venue": "国家体育馆",
        "image":"/tickets/2.jpg",
        "note": "T.I.A",
        "id": 1789278203961,
        "rating": 5
    },
    {
        "artist": "张杰",
        "city": "北京",
        "date": "2026-04-03",
        "venue": "国家体育场（鸟巢）",
        "image":"/tickets/3.jpg",
        "note": "开往1982",
        "id": 1789279257809,
        "rating": 3
    },
    {
        "artist": "孙燕姿",
        "city": "苏州",
        "date": "2026-04-12",
        "venue": "苏州奥林匹克体育中心体育场",
        "image":"/tickets/4.jpg",
        "note": "日落以后，我在苏州",
        "id": 1789279315840,
        "rating": 5
    },
    {
        "artist": "蔡依林",
        "city": "北京",
        "date": "2026-06-14",
        "venue": "国家体育场（鸟巢）",
        "image":"/tickets/5.jpg",
        "note": "It's my pleasure.",
        "id": 1789279386896,
        "rating": 5
    },
    {
        "artist": "陈粒",
        "city": "青岛",
        "date": "2026-06-28",
        "venue": "青岛市民健身中心体育馆",
        "image":"/tickets/6.jpg",
        "note": "一粒10TH",
        "id": 1789279473054,
        "rating": 4
    },
    {
        "artist": "林忆莲",
        "city": "上海",
        "date": "2026-10-10",
        "venue": "上海虹口足球场",
        "image":"/tickets/7.jpg",
        "note": "聆听生命原始，内在之音",
        "id": 1789279527315
    },
    {
        "artist": "李宇春",
        "city": "郑州",
        "date": "2026-04-18",
        "venue": "郑州奥体中心体育馆",
        "image":"/tickets/8.jpg",
        "note": "皇后与梦想",
        "id": 1789279591278,
        "rating": 4
    },
    {
        "artist": "BY2",
        "city": "北京",
        "date": "2026-05-23",
        "venue": "北京首都体育馆",
        "image":"/tickets/9.jpg",
        "note": "发生什么事，天知道.",
        "id": 1789279639636,
        "rating": 4
    },
    {
        "artist": "梁静茹",
        "city": "太原",
        "date": "2026-05-16",
        "venue": "太原体育中心体育场",
        "image":"/tickets/10.jpg",
        "note": "茹果，我不唱情歌\n那我还能唱什么呢",
        "id": 1789279777606,
        "rating": 5
    },
    {
        "artist": "孙燕姿",
        "city": "杭州",
        "date": "2026-10-09",
        "venue": "杭州奥体中心体育场（大莲花）",
        "image":"/tickets/11.jpg",
        "note": "日落以后，我在杭州",
        "id": 1789308580278
    },
    {
        "artist": "杨丞琳",
        "city": "西安",
        "date": "2026-02-07",
        "venue": "西安奥体中心体育馆",
        "image":"/tickets/12.jpg",
        "note": "每个人的房间里都有一只大象.",
        "id": 1789308629278,
        "rating": 5
    },
    {
        "artist": "梁静茹",
        "city": "石家庄",
        "date": "2026-09-26",
        "venue": "河北奥林匹克中心体育场",
        "image":"/tickets/13.jpg",
        "note": "可不可以偶尔下雨不必永远晴天.",
        "id": 1789308684097
    }
]
function App() {
  const [selectedConcert, setSelectedConcert] = useState(null)
const [showAddForm, setShowAddForm] = useState(false)
const [editingConcert, setEditingConcert] = useState(null)

const [concertList, setConcertList] = useState(() => {
  const savedConcerts = localStorage.getItem("concerts")

  if (savedConcerts) {
    return JSON.parse(savedConcerts)
  }

  return initialConcerts
})

const [searchText, setSearchText] = useState("")
const [selectedCity, setSelectedCity] = useState("全部")
const [sortType, setSortType] = useState("latest")
const totalConcerts = concertList.length
const currentYear = "2026"

const yearConcerts = concertList.filter((concert) =>
  concert.date?.startsWith(currentYear)
)

const yearConcertCount = yearConcerts.length

const yearArtists = new Set(
  yearConcerts
    .map((concert) => concert.artist?.trim())
    .filter(Boolean)
).size

const yearCities = new Set(
  yearConcerts
    .map((concert) => concert.city?.trim())
    .filter(Boolean)
).size
const sortedYearConcerts = [...yearConcerts].sort(
  (a, b) => new Date(a.date) - new Date(b.date)
)

const firstYearConcert = sortedYearConcerts[0]

const lastYearConcert =
  sortedYearConcerts[sortedYearConcerts.length - 1]

const cityCounts = yearConcerts.reduce((counts, concert) => {
  const city = concert.city?.trim()

  if (city) {
    counts[city] = (counts[city] || 0) + 1
  }

  return counts
}, {})

const mostVisitedCity = Object.entries(cityCounts).sort(
  (a, b) => b[1] - a[1]
)[0]
const uniqueArtists = new Set(
  concertList
    .map((concert) => concert.artist?.trim())
    .filter(Boolean)
).size

const uniqueCities = new Set(
  concertList
    .map((concert) => concert.city?.trim())
    .filter(Boolean)
).size
useEffect(() => {
  localStorage.setItem(
    "concerts",
    JSON.stringify(concertList)
  )
}, [concertList])

const [newConcert, setNewConcert] = useState({
  artist: "",
  city: "",
  date: "",
  venue: "",
  image: "",
  note: "",
})

  return (
    <div className="page">

      <header className="header">
        <div className="logo">MY CONCERT ARCHIVE</div>
        <div className="header-right">MY LIVE</div>
      </header>

      <main>

        <header className="hero">
  <div className="hero-text">
    <p className="eyebrow">MY CONCERT ARCHIVE</p>

    <h1>
      记录每一个
      <br />
      值得被记住的现场。
    </h1>

    <p className="hero-description">
      音乐会散场，但记忆不会。
    </p>
  </div>

  <div className="hero-number">
    <span>{totalConcerts}</span>
    <small>CONCERTS</small>
  </div>
</header>


        <section className="stats">
  <div className="stat">
    <strong>{totalConcerts}</strong>
    <span>场演出</span>
  </div>

  <div className="stat">
    <strong>{uniqueArtists}</strong>
    <span>位歌手</span>
  </div>

  <div className="stat">
    <strong>{uniqueCities}</strong>
    <span>座城市</span>
  </div>
</section>
<section className="year-record">
  <div className="section-title">
    <div>
      <p className="eyebrow">{currentYear} ARCHIVE</p>
      <h2>这一年的现场</h2>
    </div>
  </div>

  <div className="year-record-grid">
    <div className="year-record-item">
      <strong>{yearConcertCount}</strong>
      <span>场现场</span>
    </div>

    <div className="year-record-item">
      <strong>{yearArtists}</strong>
      <span>位歌手</span>
    </div>

    <div className="year-record-item">
      <strong>{yearCities}</strong>
      <span>座城市</span>
    </div>
  </div>

  <div className="year-summary">
    <p>
      这一年，我去了{" "}
      <strong>{yearConcertCount}</strong>{" "}
      场现场。
    </p>

    <div className="year-summary-cities">
      {[
        ...new Set(
          yearConcerts
            .map((concert) => concert.city)
            .filter(Boolean)
        ),
      ].map((city) => (
        <span key={city}>{city}</span>
      ))}
    </div>
  </div>
  <div className="year-highlights">
  <div className="year-highlight">
    <span>FIRST LIVE</span>
    <strong>
      {firstYearConcert ? firstYearConcert.artist : "—"}
    </strong>
    <p>
      {firstYearConcert
        ? `${firstYearConcert.date} · ${firstYearConcert.city}`
        : "还没有记录"}
    </p>
  </div>

  <div className="year-highlight">
    <span>LAST LIVE</span>
    <strong>
      {lastYearConcert ? lastYearConcert.artist : "—"}
    </strong>
    <p>
      {lastYearConcert
        ? `${lastYearConcert.date} · ${lastYearConcert.city}`
        : "还没有记录"}
    </p>
  </div>

  <div className="year-highlight">
    <span>MOST VISITED CITY</span>
    <strong>
      {mostVisitedCity ? mostVisitedCity[0] : "—"}
    </strong>
    <p>
      {mostVisitedCity
        ? `${mostVisitedCity[1]} 场现场`
        : "还没有记录"}
    </p>
  </div>
</div>
</section>
          <section className="timeline">
  <div className="section-title">
    <p className="eyebrow">MY JOURNEY</p>
    <h2>演唱会时间轴</h2>
  </div>

  <div className="timeline-list">
    {concertList
      .slice()
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .map((concert) => (
        <div className="timeline-item" key={concert.id}>
          <div className="timeline-date">
            {concert.date}
          </div>

          <div className="timeline-line">
            <span></span>
          </div>

          <div
  className="timeline-info"
  onClick={() => setSelectedConcert(concert)}
>
  <span className="timeline-number">
    LIVE {String(
      concertList.findIndex((item) => item.id === concert.id) + 1
    ).padStart(2, "0")}
  </span>

  <h3>{concert.artist}</h3>

  <p>
    {concert.city} · {concert.venue}
  </p>
</div>
        </div>
      ))}
  </div>
</section>
<section className="cities">
  <div className="section-title">
    <div>
      <p className="eyebrow">CITY FOOTPRINT</p>
      <h2>城市足迹</h2>
    </div>
  </div>

  <div className="city-route">
    {[
      ...new Set(
        concertList
          .slice()
          .sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((concert) => concert.city)
          .filter(Boolean)
      ),
    ].map((city, index, cities) => (
      <div className="route-item" key={city}>
        <div
          className={`route-city ${
            selectedCity === city ? "route-city-active" : ""
          }`}
          onClick={() => setSelectedCity(city)}
        >
          <span className="route-number">
            {String(index + 1).padStart(2, "0")}
          </span>

          <span className="route-dot"></span>

          <span className="route-name">{city}</span>
        </div>

        {index < cities.length - 1 && (
          <div className="route-line"></div>
        )}
      </div>
    ))}
  </div>

  <div className="city-list">
    <div
      className={`city-item ${
        selectedCity === "全部" ? "city-item-active" : ""
      }`}
      onClick={() => setSelectedCity("全部")}
    >
      <span className="city-dot"></span>
      <span>全部城市</span>
    </div>
  </div>
</section>
        <section className="concert-section">

          <div className="section-title">
            <div>
              <p className="eyebrow">CONCERTS</p>
              <h2>我的现场</h2>
            </div>

            <button onClick={() => setShowAddForm(true)}>
              ＋ 添加演唱会
            </button>
          </div>

<div className="search-box">
  <input
    type="text"
    value={searchText}
    onChange={(e) => setSearchText(e.target.value)}
    placeholder="搜索歌手、城市或场馆……"
  />
</div>
<div className="sort-box">
  <span>SORT BY</span>

  <select
    value={sortType}
    onChange={(e) => setSortType(e.target.value)}
  >
    <option value="latest">最新演出</option>
    <option value="earliest">最早演出</option>
    <option value="rating-high">评分最高</option>
    <option value="rating-low">评分最低</option>
  </select>
</div>
          <div className="concert-grid">

            {concertList
  .filter((concert) => {
    const keyword = searchText.toLowerCase()

    const matchesSearch =
      concert.artist.toLowerCase().includes(keyword) ||
      concert.city.toLowerCase().includes(keyword) ||
      concert.venue.toLowerCase().includes(keyword)

    const matchesCity =
      selectedCity === "全部" ||
      concert.city === selectedCity

    return matchesSearch && matchesCity
  })
  .slice()
  .sort((a, b) => {
    if (sortType === "latest") {
      return new Date(b.date) - new Date(a.date)
    }

    if (sortType === "earliest") {
      return new Date(a.date) - new Date(b.date)
    }

    if (sortType === "rating-high") {
      return (b.rating || 0) - (a.rating || 0)
    }

    if (sortType === "rating-low") {
      return (a.rating || 0) - (b.rating || 0)
    }

    return 0
  })
  .map((concert) => (
              <div
  className="concert-card"
  key={concert.id}
  onClick={() => setSelectedConcert(concert)}
>
<div className="poster">
  <img
    src={concert.image}
    alt={`${concert.artist}演唱会宣传图`}
  />
</div>
                <div className="card-info">

  <div>
    <span className="concert-number">
      {String(
        concertList.findIndex((item) => item.id === concert.id) + 1
      ).padStart(2, "0")}
    </span>

    <h3>{concert.artist}</h3>
    <p>{concert.city} · {concert.date}</p>
    <div className="card-rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <span
      key={star}
      className={star <= (concert.rating || 0) ? "active" : ""}
    >
      ★
    </span>
  ))}
</div>
  </div>

  <span className="arrow">↗</span>

</div>

              </div>
            ))}

          </div>
{selectedConcert && (
  <div
    className="modal-overlay"
    onClick={() => setSelectedConcert(null)}
  >
    <div
      className="modal"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="close-button"
        onClick={() => setSelectedConcert(null)}
      >
        ×
      </button>

      <img
        src={selectedConcert.image}
        alt={`${selectedConcert.artist}演唱会宣传图`}
        className="modal-image"
      />

      <div className="modal-content">

        <p className="eyebrow">CONCERT MEMORY</p>
<div className="concert-status">
  {new Date(selectedConcert.date) > new Date()
    ? "UPCOMING"
    : "COMPLETED"}
</div>
<p className="modal-number">
  NO.
  {String(
    concertList.findIndex(
      (item) => item.id === selectedConcert.id
    ) + 1
  ).padStart(2, "0")}
</p>
        <h2>{selectedConcert.artist}</h2>

        <p className="modal-date">
          {selectedConcert.date} · {selectedConcert.city}
        </p>

        <p className="modal-venue">
          {selectedConcert.venue}
        </p>

        <div className="rating">
  {[1, 2, 3, 4, 5].map((star) => (
    <button
      key={star}
      className={
        star <= (selectedConcert.rating || 0)
          ? "star active"
          : "star"
      }
      onClick={() => {
        const updatedConcert = {
          ...selectedConcert,
          rating: star,
        }

        setSelectedConcert(updatedConcert)

        setConcertList(
          concertList.map((concert) =>
            concert.id === updatedConcert.id
              ? updatedConcert
              : concert
          )
        )
      }}
    >
      ★
    </button>
  ))}
</div>

        <div className="note">
          <h3>我的现场记录</h3>
          <p>{selectedConcert.note}</p>
        </div>

<button
  className="edit-button"
  onClick={() => {
    setEditingConcert(selectedConcert)
    setSelectedConcert(null)
  }}
>
  编辑这场演唱会
</button>

<button
  className="delete-button"
  onClick={() => {
    setConcertList(
      concertList.filter(
        (concert) => concert.id !== selectedConcert.id
      )
    )

    setSelectedConcert(null)
  }}
>
  删除这场演唱会
</button>

      </div>

    </div>
  </div>
)}
{showAddForm && (
  <div
    className="modal-overlay"
    onClick={() => setShowAddForm(false)}
  >
    <div
      className="add-form"
      onClick={(e) => e.stopPropagation()}
    >

      <button
        className="close-button"
        onClick={() => setShowAddForm(false)}
      >
        ×
      </button>

      <p className="eyebrow">ADD CONCERT</p>

      <h2>添加演唱会</h2>

      <div className="form-field">
        <label>歌手</label>
        <input
          value={newConcert.artist}
          onChange={(e) =>
            setNewConcert({
              ...newConcert,
              artist: e.target.value,
            })
          }
          placeholder="例如：孙燕姿"
        />
      </div>

      <div className="form-field">
        <label>城市</label>
        <input
          value={newConcert.city}
          onChange={(e) =>
            setNewConcert({
              ...newConcert,
              city: e.target.value,
            })
          }
          placeholder="例如：杭州"
        />
      </div>

      <div className="form-field">
        <label>日期</label>
        <input
          type="date"
          value={newConcert.date}
          onChange={(e) =>
            setNewConcert({
              ...newConcert,
              date: e.target.value,
            })
          }
        />
      </div>

      <div className="form-field">
        <label>场馆</label>
        <input
          value={newConcert.venue}
          onChange={(e) =>
            setNewConcert({
              ...newConcert,
              venue: e.target.value,
            })
          }
          placeholder="例如：杭州奥体中心"
        />
      </div>

      <div className="form-field">
       <label>宣传图</label>
       <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0]

      if (!file) return

     const reader = new FileReader()

reader.onload = () => {
  setNewConcert({
    ...newConcert,
    image: reader.result,
  })
}

reader.readAsDataURL(file)
  }}
/>
  {newConcert.image && (
    <img
      src={newConcert.image}
      alt="演唱会宣传图预览"
      className="image-preview"
    />
  )}
</div>

      <div className="form-field">
        <label>现场记录</label>
        <textarea
          value={newConcert.note}
          onChange={(e) =>
            setNewConcert({
              ...newConcert,
              note: e.target.value,
            })
          }
          placeholder="写下这场演唱会的记忆……"
        />
      </div>

<button 
        className="save-button"
        onClick={() => {
          setConcertList([
            ...concertList,
            {
              ...newConcert,
              id: Date.now(),
            },
          ])
          
          setNewConcert({
            artist: "",
            city: "",
            date: "",
            venue: "",
            image: "",
            note: "",
          })
          
          setShowAddForm(false)
        }}
      >
        保存演唱会
      </button>
    </div>
  </div>
)}        </section>
{editingConcert && (
  <div
    className="modal-overlay"
    onClick={() => setEditingConcert(null)}
  >
    <div
      className="add-form"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        className="close-button"
        onClick={() => setEditingConcert(null)}
      >
        ×
      </button>

      <p className="eyebrow">EDIT CONCERT</p>

      <h2>编辑演唱会</h2>

      <div className="form-field">
        <label>歌手</label>
        <input
          value={editingConcert.artist}
          onChange={(e) =>
            setEditingConcert({
              ...editingConcert,
              artist: e.target.value,
            })
          }
        />
      </div>

      <div className="form-field">
        <label>城市</label>
        <input
          value={editingConcert.city}
          onChange={(e) =>
            setEditingConcert({
              ...editingConcert,
              city: e.target.value,
            })
          }
        />
      </div>

      <div className="form-field">
        <label>日期</label>
        <input
          type="date"
          value={editingConcert.date}
          onChange={(e) =>
            setEditingConcert({
              ...editingConcert,
              date: e.target.value,
            })
          }
        />
      </div>

      <div className="form-field">
        <label>场馆</label>
        <input
          value={editingConcert.venue}
          onChange={(e) =>
            setEditingConcert({
              ...editingConcert,
              venue: e.target.value,
            })
          }
        />
      </div>
<div className="form-field">
  <label>宣传图</label>

  <input
    type="file"
    accept="image/*"
    onChange={(e) => {
      const file = e.target.files[0]
      if (!file) return

      const reader = new FileReader()

      reader.onload = () => {
        setEditingConcert({
          ...editingConcert,
          image: reader.result,
        })
      }

      reader.readAsDataURL(file)
    }}
  />

  {editingConcert.image && (
    <img
      src={editingConcert.image}
      alt="演唱会宣传图预览"
      className="image-preview"
    />
  )}
</div>
      <div className="form-field">
        <label>现场记录</label>
        <textarea
          value={editingConcert.note}
          onChange={(e) =>
            setEditingConcert({
              ...editingConcert,
              note: e.target.value,
            })
          }
        />
      </div>

      <button
        className="save-button"
        onClick={() => {
          setConcertList(
            concertList.map((concert) =>
              concert.id === editingConcert.id
                ? editingConcert
                : concert
            )
          )

          setEditingConcert(null)
        }}
      >
        保存修改
      </button>
    </div>
  </div>
)}
      </main>

    </div>
  )
}

export default App
