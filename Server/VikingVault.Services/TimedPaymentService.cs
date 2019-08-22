using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services.Abstractions;

namespace VikingVault.Services
{
    public class TimedPaymentService : IHostedService
    {
        private Timer _timer;
        public IServiceProvider Services { get; }
        public int PaymentCheckInterval = 5 * 60;

        public TimedPaymentService(IServiceProvider services)
        {
            Services = services;
        }

        public Task StartAsync(CancellationToken cancellationToken)
        {
             _timer = new Timer(DoWork, null, TimeSpan.Zero, TimeSpan.FromSeconds(PaymentCheckInterval));
             return Task.CompletedTask;         
        }

        private void DoWork(object state)
        {
            using (var scope = Services.CreateScope())
            {
                var scopedProcessingService =
                    scope.ServiceProvider
                        .GetRequiredService<IScopedProcessingService>();

                scopedProcessingService.PayCompanies();
            }
        }

        public Task StopAsync(CancellationToken cancellationToken)
        {
            _timer?.Change(Timeout.Infinite, 0);
            return Task.CompletedTask;
        }
    }
}
