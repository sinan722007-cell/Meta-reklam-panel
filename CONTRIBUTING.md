# Contributing to Meta Reklam Panel

First off, thanks for taking the time to contribute! 🎉

The following is a set of guidelines for contributing to Meta Reklam Panel.

## Code of Conduct

Be respectful and constructive in all interactions.

## How Can I Contribute?

### Reporting Bugs

Before creating bug reports, please check the issue list as you might find out that you don't need to create one. When you are creating a bug report, please include as many details as possible:

- **Use a clear and descriptive title**
- **Describe the exact steps which reproduce the problem**
- **Provide specific examples to demonstrate the steps**
- **Describe the behavior you observed after following the steps**
- **Explain which behavior you expected to see instead and why**
- **Include screenshots and animated GIFs if possible**

### Suggesting Enhancements

When creating enhancement suggestions, please include:

- **Use a clear and descriptive title**
- **Provide a step-by-step description of the suggested enhancement**
- **Provide specific examples to demonstrate the steps**
- **Describe the current behavior and expected behavior**
- **Explain why this enhancement would be useful**

### Pull Requests

- Fill in the required template
- Follow the TypeScript/React styleguides
- Include appropriate test cases
- Update documentation as needed
- End all files with a newline

## Styleguides

### Git Commit Messages

- Use the present tense ("Add feature" not "Added feature")
- Use the imperative mood ("Move cursor to..." not "Moves cursor to...")
- Limit the first line to 72 characters or less
- Reference issues and pull requests liberally after the first line

Example:
```
Add support for Antigravity integration

- Implement API client
- Add real-time tracking
- Update database schema

Fixes #123
```

### TypeScript Styleguide

- Use `const` and `let` instead of `var`
- Use meaningful variable names
- Add type annotations for function parameters and returns
- Use interfaces for object types
- Keep functions small and focused

Example:
```typescript
interface UserData {
  id: string;
  email: string;
}

async function fetchUser(userId: string): Promise<UserData> {
  // Implementation
}
```

### React Component Styleguide

- Use functional components with hooks
- Keep components focused and reusable
- Use TypeScript for prop types
- Extract logic to custom hooks when appropriate

Example:
```typescript
interface ButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <button onClick={onClick} className="btn">
      {children}
    </button>
  );
};
```

## Testing

- Write tests for new features
- Ensure all tests pass before submitting PR
- Aim for at least 80% code coverage

## Development Setup

1. Fork the repo
2. Clone your fork: `git clone --depth 1 <your-fork-url>`
3. Install dependencies: `npm run install-all`
4. Create a branch: `git checkout -b feature/my-feature`
5. Make your changes
6. Test your changes: `npm run test`
7. Lint your code: `npm run lint`
8. Commit and push: `git push origin feature/my-feature`
9. Create a Pull Request

## Questions?

Feel free to open an issue with the `question` label or contact the maintainers.

---

Thank you for contributing! ❤️
