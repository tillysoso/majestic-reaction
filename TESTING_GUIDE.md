# Testing Quick Reference

## Run All Tests
```bash
npm test
```

## Run Specific Test Files
```bash
# Avatar styling tests
npm test AvatarStyling

# Reading consistency tests  
npm test ReadingConsistency
```

## Test Coverage
```bash
npm test -- --coverage
```

## Watch Mode (Auto-rerun on changes)
```bash
npm test -- --watch
```

## Test Categories

### Avatar Styling Tests (15 tests)
✅ Body class application  
✅ Avatar switching  
✅ Component rendering  
✅ Icon display  
✅ XP display  
✅ Card keywords  
✅ Chip disabling  
✅ Styling consistency  

### Reading Consistency Tests (15 tests)
✅ Chip structure (all avatars)  
✅ Response completeness  
✅ Personality voices  
✅ XP awards  
✅ Feature parity  
✅ UX consistency  

## Expected Output
```
 ✓ src/tests/AvatarStyling.test.tsx (15)
 ✓ src/tests/ReadingConsistency.test.ts (15)

Test Files  2 passed (2)
Tests  30 passed (30)
```

## Troubleshooting

### Tests Won't Run
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Check Vitest installed
npm list vitest
```

### Import Errors
```bash
# Check tsconfig paths
cat tsconfig.json | grep "@/*"

# Should see:
# "@/*": ["./src/*"]
```

### Component Tests Fail
```bash
# Check React Testing Library installed
npm list @testing-library/react

# Should see version
```

## CI/CD Integration

### GitHub Actions Example
```yaml
- name: Run Tests
  run: npm test

- name: Check Coverage
  run: npm test -- --coverage
```

### Pre-commit Hook
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "npm test"
    }
  }
}
```

## Test Files Location
- `src/tests/AvatarStyling.test.tsx`
- `src/tests/ReadingConsistency.test.ts`

## What Tests Verify

### Cross-Avatar Consistency
- All 4 avatars have same features
- All 4 avatars have same interaction patterns
- All 4 avatars have proper styling

### Personality Consistency
- Olivia maintains conversational tone
- Elijah maintains lowercase style
- Destiny maintains contemplative voice
- Casper maintains direct/caps approach

### Technical Correctness
- Components render without errors
- Props passed correctly
- State updates properly
- Styles apply correctly
- Body classes managed correctly
