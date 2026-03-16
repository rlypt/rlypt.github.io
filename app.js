const noteTextArea = document.getElementById('note');

// 加载保存的笔记
const savedNote = localStorage.getItem('myNote');
if (savedNote) {
    noteTextArea.value = savedNote;
}

// 实时保存笔记
noteTextArea.addEventListener('input', () => {
    localStorage.setItem('myNote', noteTextArea.value);
    console.log('笔记已保存到本地');
});