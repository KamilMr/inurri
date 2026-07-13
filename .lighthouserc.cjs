module.exports = {
  ci: {
    collect: {
      staticDistDir: './dist/client',
      url: [
        '/pl/',
        '/pl/contact/'
      ],
      numberOfRuns: 2,
    },
    upload: {
      target: 'temporary-public-storage',
    },
    assert: {
      assertions: {
        'categories:performance': ['warn', { minScore: 0.9 }],
        'categories:accessibility': ['error', { minScore: 0.95 }],
        'categories:best-practices': ['error', { minScore: 0.9 }],
        'categories:seo': ['error', { minScore: 0.95 }],
      },
    },
  },
};
