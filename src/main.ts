import { spawn } from 'child_process';
import * as path from 'path';

// Function to start a service
function startService(servicePath: string, serviceName: string) {
  const fullPath = path.join(__dirname, servicePath);
  console.log(`Starting ${serviceName}...`);
  
  const child = spawn('node', [fullPath], {
    stdio: 'inherit',
    shell: true,
  });
  
  child.on('error', (error) => {
    console.error(`Error starting ${serviceName}:`, error);
  });
  
  child.on('close', (code) => {
    console.log(`${serviceName} exited with code ${code}`);
  });
  
  return child;
}

// Start all services
async function bootstrap() {
  // Start microservices first
  const usersService = startService('microservices/users/main.js', 'Users Service');
  const productsService = startService('microservices/products/main.js', 'Products Service');
  
  // Wait a bit for microservices to start
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Start gateway last
  const gatewayService = startService('gateway/main.js', 'Gateway Service');
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('Shutting down all services...');
    usersService.kill();
    productsService.kill();
    gatewayService.kill();
    process.exit(0);
  });
}

bootstrap();