# BMAD-METHOD Framework Plugin

## Overview

The BMAD-METHOD Framework is an agile AI development methodology that provides structured phases and specialized agent personas for Automaker's feature development workflow.

## Phases

BMAD consists of four phases that guide feature development:

1. **Brainstorming** - Generate and explore ideas, define requirements, identify potential solutions
2. **Architecture** - Design system architecture, define components, plan implementation strategy
3. **Development** - Implement the feature following architectural plans and coding standards
4. **Testing** - Verify implementation, run tests, ensure quality standards are met

## Personas

BMAD defines five specialized agent personas:

- **Master Agent** - Orchestrates the overall development process
- **Scrum Master (SM)** - Facilitates agile processes and removes blockers
- **Developer (DEV)** - Implements features following coding standards
- **QA Engineer** - Ensures quality through testing and validation
- **Software Architect** - Designs system architecture and provides guidance

## Configuration

### Main Settings

- **Enable BMAD Framework** - Enable or disable the BMAD framework
- **Use Agent Personas** - Apply BMAD personas during agent execution
- **Track Phase Progress** - Track and display BMAD phase progress for features
- **Default Feature Complexity** - Set the default complexity (simple, moderate, complex, very-complex)

### Phase Duration

Configure estimated duration for each BMAD phase (in minutes):

- Brainstorming: 15 minutes (default)
- Architecture: 20 minutes (default)
- Development: 45 minutes (default)
- Testing: 20 minutes (default)

### Persona Configuration

Enable or disable individual personas:

- Master Agent
- Scrum Master
- Developer
- QA Engineer
- Software Architect

## Usage

Once enabled, BMAD automatically applies phases and personas to feature development:

1. Features start in the **Brainstorming** phase with the **Master Agent** persona
2. As requirements are defined, features transition to **Architecture** phase
3. Once design is complete, features move to **Development** phase with **Developer** persona
4. After implementation, features enter **Testing** phase with **QA Engineer** persona

## Integration

The BMAD plugin integrates with Automaker through:

- **Feature Loader** - Tracks feature phases and transitions
- **Agent Service** - Applies BMAD personas during agent execution
- **Settings** - Stores BMAD configuration in global settings
- **UI Components** - Displays phase indicators and persona badges

## License

MIT License - See Automaker project license for details.
