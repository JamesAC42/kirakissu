import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // settings
  await prisma.settingsKV.upsert({
    where: { key: "profile" },
    update: {},
    create: { key: "profile", value: { headerText: "Hi! I'm Yuè ♡ ギャル好きの開発者", subHeaderText: "Welcome to my digital diary!" } },
  });
  await prisma.settingsKV.upsert({
    where: { key: "status" },
    update: {},
    create: { key: "status", value: { mood: "きらきら", watching: "セーラームーン", playing: "osu!" } },
  });
  await prisma.settingsKV.upsert({
    where: { key: "faq" },
    update: {},
    create: { key: "faq", value: { faqs: [
      { question: "What is this website?", answer: "This is my personal website where I share my interests in Japanese culture, music, fashion and more! I wanted to create a cozy space that feels like a digital diary ♡" },
      { question: "How often do you update?", answer: "I try to update at least once a week with new blog posts, photos, and music recommendations! The site is always evolving as I learn new things." },
      { question: "What inspired the design?", answer: "The aesthetic is inspired by Y2K web design, Japanese kawaii culture, and nostalgic elements like Windows 98. I wanted it to feel both retro and modern!" },
      { question: "Can I contact you?", answer: "Yes! Feel free to reach out through any of my social media links. I love connecting with others who share similar interests ✧˖°" }
    ] } },
  });
  await prisma.settingsKV.upsert({
    where: { key: "favorites" },
    update: {},
    create: { key: "favorites", value: { favorites: [
      { type: "song", emoji: "🎵", value: "ピーチソーダ" },
      { type: "makeup", emoji: "💄", value: "glitter liner" },
      { type: "skincare", emoji: "✨", value: "jelly mask" },
      { type: "snack", emoji: "🍓", value: "strawberry pocky" },
      { type: "drink", emoji: "🥤", value: "bubble tea" },
      { type: "accessory", emoji: "🎀", value: "hair bows" },
      { type: "color", emoji: "💗", value: "pastel pink" },
      { type: "season", emoji: "🍁", value: "fall" }
    ] } },
  });
  await prisma.settingsKV.upsert({
    where: { key: "todo" },
    update: {},
    create: { key: "todo", value: { todos: [
      { id: "1", title: "finish portfolio redesign", completed: true },
      { id: "2", title: "update blog with tokyo photos", completed: false },
      { id: "3", title: "organize skincare routine", completed: true },
      { id: "4", title: "buy new macaron flavors", completed: true },
      { id: "5", title: "watch sailor moon episode", completed: true },
      { id: "6", title: "practice japanese kanji", completed: false },
      { id: "7", title: "find new kawaii accessories", completed: true },
      { id: "8", title: "plan next purikura session", completed: false },
    ] } },
  });

  // poll
  const poll = await prisma.poll.create({ data: { question: "who is your favorite sanrio character? サンリオは誰が好き？", activeFrom: new Date() } });
  const pollOptions = ["my melody", "kuromi", "cinnamoroll", "hello kitty", "pompompurin", "keroppi", "pochacco", "little twin stars", "charmy kitty", "badtz maru", "my sweet piano", "big challenges"];
  for (let i = 0; i < pollOptions.length; i++) {
    await prisma.pollOption.create({ data: { pollId: poll.id, label: pollOptions[i], sort: i } });
  }

  // quiz
  const quiz = await prisma.quiz.create({ data: { question: "Which Sanrio character is a white puppy with long, floppy ears that can fly? どのサンリオのキャラクターが長い耳で飛べる白い子犬？", active: true } });
  const quizOptionData = [
    { id: "cinnamoroll", label: "Cinnamoroll" },
    { id: "hello-kitty", label: "Hello Kitty" },
    { id: "pompompurin", label: "Pompompurin" },
    { id: "kuromi", label: "Kuromi" }
  ];
  for (let i = 0; i < quizOptionData.length; i++) {
    await prisma.quizOption.create({ data: { id: quizOptionData[i].id, quizId: quiz.id, label: quizOptionData[i].label, sort: i } });
  }
  await prisma.quiz.update({ where: { id: quiz.id }, data: { correctOptionId: quizOptionData[0].id } });

  // survey
  const survey = await prisma.survey.create({ data: { question: "What content would you like to see more of? どんなコンテンツが見たい？", active: true } });
  const surveyChoices = [
    { id: "music", label: "More music recommendations" },
    { id: "fashion", label: "Fashion & gyaru coords" },
    { id: "beauty", label: "Health & beauty tips" },
    { id: "travel", label: "Tokyo life & travel" },
    { id: "coding", label: "Coding and dev logs" }
  ];
  for (let i = 0; i < surveyChoices.length; i++) {
    await prisma.surveyOption.create({ data: { id: surveyChoices[i].id, surveyId: survey.id, label: surveyChoices[i].label, sort: i } });
  }

  // scrapbook minimal seed
  await prisma.scrapbookItem.createMany({
    data: [
      { imageUrl: "/images/gallery/cookies.jpg", caption: "cookies" },
      { imageUrl: "/images/gallery/japan.jpg", caption: "japan" },
      { imageUrl: "/images/gallery/kon.jpg", caption: "kon" },
      { imageUrl: "/images/gallery/nichijou.jpg", caption: "nichijou" },
      { imageUrl: "/images/gallery/popteen.jpg", caption: "popteen" },
    ],
    skipDuplicates: true,
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });


