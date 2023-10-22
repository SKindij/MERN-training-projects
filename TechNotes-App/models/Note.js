// Note.js
const mongoose = require('mongoose');
// для автоматичного створення послідовних значень
const AutoIncrement = require('mongoose-sequence')(mongoose);

// створення схеми для моделі Note
const noteSchema = new mongoose.Schema(
  {
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User' // посилання на модель User
    },
    title: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false // за замовчуванням
    }
  },
  {
    // автовідстеження дати створення та оновлення запису
    timestamps: true
  }
)

// для створення автоматично збільшуваних номерів
noteSchema.plugin(AutoIncrement, {
    inc_field: 'ticket', // поле, в якому буде зберігатися збільшуваний номер
    id: 'ticketNums', // колекція, в якій буде зберігатися інфо про номери
    start_seq: 500 // початкове значення
});

module.exports = mongoose.model('Note', noteSchema);
