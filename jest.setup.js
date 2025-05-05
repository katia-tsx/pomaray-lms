// Configuración global para Jest

// Mock para localStorage
if (typeof window !== "undefined") {
  Object.defineProperty(window, "localStorage", {
    value: {
      store: {},
      getItem: function (key) {
        return this.store[key] || null
      },
      setItem: function (key, value) {
        this.store[key] = value.toString()
      },
      removeItem: function (key) {
        delete this.store[key]
      },
      clear: function () {
        this.store = {}
      },
    },
  })
}

// Mock para fetch
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({}),
    ok: true,
    status: 200,
    text: () => Promise.resolve(""),
  }),
)
