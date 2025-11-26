# **PromptDock — Your Personal Prompt Organizer for ChatGPT**

PromptDock is a lightweight Chrome Extension that lets you **save, organize, and instantly reuse your best ChatGPT prompts** — right from your browser.  
No more scrolling through old chats or losing prompts inside long sessions. Everything is structured, searchable, and one click away.

---

## 🚀 **Features**

### **✨ Save Prompts Instantly**
Store any prompt you use while browsing or chatting.  
Each prompt includes:
- Title  
- Content  
- Tags  
- Folder  
- Pinned state  
- Timestamp  

### **📁 Organize Your Workspace**
Use folders and tags to keep your prompt library clean and efficient.  
Quickly filter by folder or search across all prompts.

### **🔍 Fast Search**
Search by:
- Title  
- Body text  
- Tags  

Perfect for users with large prompt collections.

### **📋 One-Click Copy**
Insert your most-used prompts into ChatGPT in seconds with a single tap.

### **🔐 Privacy-First**
PromptDock stores all data **locally in `chrome.storage.sync`**.  
Nothing leaves your browser. No cloud. No tracking. No external databases.

---

## 🛠️ **Tech Stack**

- **TypeScript**
- **React + Vite**
- **TailwindCSS**
- **Chrome Extension (Manifest V3)**
- **chrome.storage.sync** (local-only persistence)

Architecture uses **Atomic Design** and a repository pattern so future features (cloud sync, teams, AI tagging) can be added without rewrites.

---

## 📦 **Installation (Development)**

```bash
git clone https://github.com/<your-username>/promptdock.git
cd promptdock
npm install
npm run dev
```
