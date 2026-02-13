/**
 * BMAD-METHOD Framework Plugin
 *
 * Main entry point for the BMAD plugin that integrates the BMAD framework
 * with Automaker's feature development workflow.
 */

const BMAD_PLUGIN_INFO = {
  id: 'bmad-framework',
  name: 'BMAD-METHOD Framework',
  version: '1.0.0',
  description: 'Agile AI development framework with structured phases and specialized personas',
};

/**
 * Plugin initialization
 */
function initialize(context) {
  console.log(`[${BMAD_PLUGIN_INFO.name}] Initializing plugin...`);

  // Register BMAD phases with the system
  if (context.registerPhase) {
    context.registerPhase('brainstorming', {
      name: 'Brainstorming',
      description: 'Generate ideas and explore requirements',
      order: 1,
      duration: 15,
    });
    context.registerPhase('architecture', {
      name: 'Architecture',
      description: 'Design system architecture and components',
      order: 2,
      duration: 20,
    });
    context.registerPhase('development', {
      name: 'Development',
      description: 'Implement the feature',
      order: 3,
      duration: 45,
    });
    context.registerPhase('testing', {
      name: 'Testing',
      description: 'Verify implementation and quality',
      order: 4,
      duration: 20,
    });
  }

  // Register BMAD personas with the system
  if (context.registerPersona) {
    context.registerPersona('master', {
      name: 'Master Agent',
      description: 'Orchestrates the overall development process',
      phases: ['brainstorming', 'architecture', 'development', 'testing'],
    });
    context.registerPersona('sm', {
      name: 'Scrum Master',
      description: 'Facilitates agile processes and removes blockers',
      phases: ['brainstorming', 'development'],
    });
    context.registerPersona('dev', {
      name: 'Developer',
      description: 'Implements features following coding standards',
      phases: ['development', 'testing'],
    });
    context.registerPersona('qa', {
      name: 'QA Engineer',
      description: 'Ensures quality through testing and validation',
      phases: ['testing', 'development'],
    });
    context.registerPersona('architect', {
      name: 'Software Architect',
      description: 'Designs system architecture and provides guidance',
      phases: ['brainstorming', 'architecture', 'development'],
    });
  }

  console.log(`[${BMAD_PLUGIN_INFO.name}] Plugin initialized successfully`);

  return {
    info: BMAD_PLUGIN_INFO,
  };
}

/**
 * Enhance agent execution with BMAD persona
 */
function enhanceAgentExecution(agent, feature, context) {
  const config = context.getPluginConfig('bmad-framework') || {};

  if (!config.enabled) {
    return null; // BMAD is disabled, don't enhance
  }

  const phase = determinePhase(feature);
  const persona = selectPersona(phase, feature);

  if (!config.usePersonas || !persona) {
    return null; // Personas disabled or no persona selected
  }

  return {
    persona,
    phase,
    systemPrompt: getPersonaPrompt(persona, phase),
    phaseInstructions: getPhaseInstructions(phase),
  };
}

/**
 * Determine BMAD phase for a feature
 */
function determinePhase(feature) {
  const status = (feature.status || '').toLowerCase();

  if (status === 'pending' || status === 'queued') {
    return 'brainstorming';
  }
  if (status === 'planning' || status === 'architecting') {
    return 'architecture';
  }
  if (status === 'running' || status === 'in-progress') {
    return 'development';
  }
  if (status === 'testing' || status === 'verifying') {
    return 'testing';
  }

  return 'brainstorming';
}

/**
 * Select appropriate persona for a phase
 */
function selectPersona(phase, feature) {
  const phasePersonas = {
    brainstorming: ['master', 'sm'],
    architecture: ['architect', 'master'],
    development: ['dev', 'architect'],
    testing: ['qa', 'dev'],
  };

  const availablePersonas = phasePersonas[phase] || ['master'];
  return availablePersonas[0];
}

/**
 * Get persona-specific prompt
 */
function getPersonaPrompt(persona, phase) {
  const prompts = {
    master: `You are the Master Agent, responsible for orchestrating the entire BMAD development process.

Your responsibilities:
- Maintain a holistic view of the project
- Coordinate between different phases and team members
- Make high-level decisions when consensus cannot be reached
- Ensure quality standards are maintained across all phases`,

    sm: `You are the Scrum Master (SM), responsible for facilitating agile development processes.

Your responsibilities:
- Guide the team through agile ceremonies and practices
- Remove blockers and impediments
- Foster a collaborative team environment
- Track progress and identify risks`,

    dev: `You are the Developer (DEV), responsible for implementing high-quality software.

Your responsibilities:
- Write clean, maintainable, and efficient code
- Follow established coding standards and patterns
- Implement features according to specifications
- Write tests for your code`,

    qa: `You are the QA Engineer, responsible for ensuring software quality and reliability.

Your responsibilities:
- Design and execute comprehensive test plans
- Identify bugs and potential issues
- Verify fixes and validate requirements
- Advocate for quality throughout the development process`,

    architect: `You are the Software Architect, responsible for designing robust and scalable systems.

Your responsibilities:
- Design system architecture and component structure
- Define interfaces and data models
- Make technology and framework decisions
- Provide technical guidance to the development team`,
  };

  return prompts[persona] || prompts.master;
}

/**
 * Get phase-specific instructions
 */
function getPhaseInstructions(phase) {
  const instructions = {
    brainstorming: `=== Brainstorming Phase ===
Focus on:
1. Exploring multiple solution approaches
2. Identifying potential risks and constraints
3. Generating creative ideas
4. Gathering requirements through questions`,

    architecture: `=== Architecture Phase ===
Focus on:
1. Designing system components and their relationships
2. Planning data structures and interfaces
3. Considering scalability and maintainability
4. Creating implementation roadmap`,

    development: `=== Development Phase ===
Focus on:
1. Writing clean, maintainable code
2. Following coding standards and best practices
3. Implementing according to architectural plans
4. Writing clear comments and documentation`,

    testing: `=== Testing Phase ===
Focus on:
1. Verifying implementation correctness
2. Writing comprehensive tests
3. Checking edge cases and error conditions
4. Ensuring code quality and performance`,
  };

  return instructions[phase] || '';
}

/**
 * Export plugin API
 */
module.exports = {
  initialize,
  enhanceAgentExecution,
  info: BMAD_PLUGIN_INFO,
};
