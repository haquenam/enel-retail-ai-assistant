# Enel Retail AI Assistant

AI Integrator Bangla Lab এর Lesson 9 এর জন্য তৈরি একটি শিক্ষামূলক ডেমো প্রকল্প।

## বর্তমান অবস্থা

`main` branch এখন Lesson 9 রেকর্ডিংয়ের শুরুর অবস্থায় রাখা হয়েছে। Enel Retail ওয়েবসাইট প্রস্তুত আছে, কিন্তু Enel Assist chatbot ইচ্ছাকৃতভাবে সরিয়ে রাখা হয়েছে। ভিডিওতে chatbot launcher, chat window, conversation logic এবং Google Sheet integration ধাপে ধাপে তৈরি করা হবে।

## নিরাপদ ব্যাকআপ

সম্পূর্ণ পরীক্ষামূলক chatbot prototype আলাদা branch এ সংরক্ষিত আছে:

`lesson-09-complete-backup`

এই branch আমাদের reference solution হিসেবে থাকবে, যাতে রেকর্ডিংয়ের সময় কোনো সমস্যা হলে working prototype হারিয়ে না যায়।

## `main` branch এর ফাইল

- `index.html` — Enel Retail এর pre-built demo website
- `style.css` — website এর responsive design
- `script.js` — Lesson 9 recording baseline; chatbot logic এখনো যোগ করা হয়নি

## Lesson 9 এ যা তৈরি করা হবে

1. Enel Assist launcher button
2. Chat window এবং message area
3. Customer message input এবং send behaviour
4. Conversational information capture
5. Google Sheet এ স্বয়ংক্রিয়ভাবে customer request লেখা
6. Lesson 8 এর Google Apps Script, Gemini, business rules এবং email/escalation processing এর সাথে connection
7. End-to-end customer test

## ডেমো নিরাপত্তা

এই প্রকল্পে কেবল কাল্পনিক বা স্যানিটাইজড ডেটা ব্যবহার করা হবে। কোনো API key, password, token, Google credential বা বাস্তব customer data GitHub এ রাখা যাবে না।

---

**Enel Demo Lab**  
AI Integrator Bangla Lab
