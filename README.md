# 🧠 เกมจับคู่การ์ด - Memory Card Game

เกมฝึกสมองสำหรับผู้เข้าร่วมงาน **"พลิกโฉมคุณค่าชีวิต 50+ สู่สังคมยุคเทค AI"**

## 🎮 คุณสมบัติของเกม

- **3 ระดับความยาก**: ง่าย, ปานกลาง, ยาก
- **ติดตามสถิติ**: เวลา, จำนวนครั้งที่เล่น, คู่ที่จับได้
- **รองรับทุกอุปกรณ์**: Desktop, Tablet, มือถือ
- **UI ที่เข้าใจง่าย**: ออกแบบสำหรับผู้เข้าร่วมงานวัย 50+
- **เอฟเฟกต์สวยงาม**: Animation และ transition ที่นุ่มนวล

## 🛠️ เทคโนโลยีที่ใช้

- **Next.js 14** - React framework ด้วย App Router
- **TypeScript** - Type safety และ developer experience ที่ดี
- **Shadcn UI** - Modern และ accessible UI components
- **Tailwind CSS** - Utility-first CSS framework
- **React Hooks** - สำหรับจัดการ state และ game logic

## 🚀 วิธีการเรียกใช้งาน

### ติดตั้ง Dependencies

\`\`\`bash
npm install
\`\`\`

### เริ่มต้น Development Server

\`\`\`bash
npm run dev
\`\`\`

เปิดเบราว์เซอร์ไปที่ [http://localhost:3000](http://localhost:3000)

### Build สำหรับ Production

\`\`\`bash
npm run build
npm run start
\`\`\`

## 🎯 วิธีการเล่น

1. **เลือกระดับความยาก**: ง่าย (4x4), ปานกลาง (6x6), ยาก (8x8)
2. **กดปุ่ม "เริ่มเล่น"** เพื่อเริ่มเกม
3. **คลิกการ์ด 2 ใบ** เพื่อดูว่าเป็นคู่เดียวกันไหม
4. **จับคู่การ์ดให้ครบทุกคู่** เพื่อชนะเกม
5. **ดูสถิติการเล่น** และลองท้าทายตัวเองในระดับที่ยากขึ้น

## 📁 โครงสร้างโปรเจกต์

\`\`\`
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── ui/                # Shadcn UI components
│   ├── GameCard.tsx       # การ์ดเกม
│   ├── GameStatsDisplay.tsx # แสดงสถิติ
│   └── MemoryCardGame.tsx # หน้าเกมหลัก
├── hooks/
│   └── useMemoryGame.ts   # Game logic hook
├── types/
│   └── game.ts           # TypeScript types
└── utils/
    └── gameUtils.ts      # Helper functions
\`\`\`

## 🎨 การปรับแต่ง

### เพิ่มเอโมจิใหม่

แก้ไขใน \`src/utils/gameUtils.ts\`:

\`\`\`typescript
export const CARD_EMOJIS = [
  '🎵', '🎨', '🌸', '🌟', // เพิ่มเอโมจิใหม่ที่นี่
  // ...
];
\`\`\`

### เปลี่ยนระดับความยาก

แก้ไขใน \`src/utils/gameUtils.ts\`:

\`\`\`typescript
export const DIFFICULTY_CONFIG: Record<Difficulty, GameConfig> = {
  easy: { difficulty: 'easy', gridSize: 4, totalPairs: 8 },
  // ปรับ gridSize และ totalPairs ตามต้องการ
};
\`\`\`

## 📱 Responsive Design

เกมรองรับการใช้งานบนหน้าจอทุกขนาด:
- **Desktop**: Grid ขนาดใหญ่ เหมาะสำหรับการเล่นที่บ้าน
- **Tablet**: Grid ขนาดกลาง เล่นง่าย touch-friendly
- **Mobile**: Grid ขนาดเล็ก เหมาะสำหรับการเล่นในที่แคบ

## 🌐 Browser Support

รองรับเบราว์เซอร์สมัยใหม่:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 📄 License

MIT License - ใช้งานได้อย่างอิสระ

---

สร้างด้วย ❤️ สำหรับงาน **"พลิกโฉมคุณค่าชีวิต 50+ สู่สังคมยุคเทค AI"**
