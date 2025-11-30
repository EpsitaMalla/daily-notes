import { useState } from 'react'
import './App.css'

interface Task {
  id: number
  title: string
  completed: boolean
  date: string
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [input, setInput] = useState('')
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all')

  const addTask = () => {
    if (input.trim()) {
      const newTask: Task = {
        id: Date.now(),
        title: input,
        completed: false,
        date: new Date().toLocaleDateString('en-US', {
          weekday: 'short',
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }),
      }
      setTasks([newTask, ...tasks])
      setInput('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task => (task.id === id ? { ...task, completed: !task.completed } : task)))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'active') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const completedCount = tasks.filter(t => t.completed).length
  const activeCount = tasks.filter(t => !t.completed).length

  return (
    <div className="app">
      <div className="container">
        {/* Header */}
        <div className="header">
          <h1 className="title">📝 Daily Notes</h1>
          <p className="subtitle">Stay organized, achieve more</p>
        </div>

        {/* Stats */}
        <div className="stats">
          <div className="stat-item">
            <span className="stat-label">Total</span>
            <span className="stat-value">{tasks.length}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Active</span>
            <span className="stat-value active">{activeCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Completed</span>
            <span className="stat-value completed">{completedCount}</span>
          </div>
        </div>

        {/* Input Section */}
        <div className="input-section">
          <div className="input-wrapper">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyPress={e => e.key === 'Enter' && addTask()}
              placeholder="✨ Add a new task..."
              className="input"
            />
            <button onClick={addTask} className="add-btn">
              +
            </button>
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="filter-section">
          <button
            className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All
          </button>
          <button
            className={`filter-btn ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active
          </button>
          <button
            className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
            onClick={() => setFilter('completed')}
          >
            Completed
          </button>
        </div>

        {/* Tasks List */}
        <div className="tasks-container">
          {filteredTasks.length === 0 ? (
            <div className="empty-state">
              <p className="empty-emoji">🎉</p>
              <p className="empty-text">
                {filter === 'completed'
                  ? 'No completed tasks yet. Keep pushing!'
                  : filter === 'active'
                    ? 'All caught up! Great job!'
                    : 'No tasks yet. Add one to get started!'}
              </p>
            </div>
          ) : (
            <ul className="tasks-list">
              {filteredTasks.map(task => (
                <li key={task.id} className={`task-item ${task.completed ? 'completed' : ''}`}>
                  <label className="checkbox-container">
                    <input
                      type="checkbox"
                      checked={task.completed}
                      onChange={() => toggleTask(task.id)}
                      className="checkbox"
                    />
                    <span className="checkmark"></span>
                  </label>
                  <div className="task-content">
                    <p className="task-title">{task.title}</p>
                    <p className="task-date">{task.date}</p>
                  </div>
                  <button
                    onClick={() => deleteTask(task.id)}
                    className="delete-btn"
                    title="Delete task"
                  >
                    ✕
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        <div className="footer">
          <p>You're doing great! Keep it up 💪</p>
        </div>
      </div>
    </div>
  )
}

export default App
