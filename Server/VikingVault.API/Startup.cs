using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebSockets.Internal;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VikingVault.DataAccess;
using VikingVault.DataAccess.Models;
using VikingVault.Services;
using VikingVault.Services.Abstractions;

namespace VikingVault.API
{
    public class Startup
    {
	    private readonly IHostingEnvironment _environment;

	    public Startup(IConfiguration configuration, IHostingEnvironment environment)
        {
            Configuration = configuration;
	        _environment = environment;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors();
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);

	        var connectionString = _environment.IsDevelopment() ? Configuration.GetConnectionString("DefaultConnection") : Configuration.GetConnectionString("LiveDbConnection");

			services.AddDbContext<VikingVaultDbContext>
                (options => options.UseSqlServer(connectionString));

            // configure strongly typed settings objects
            var appSettingsSection = Configuration.GetSection("AppSettings");
            services.Configure<AppSettings>(appSettingsSection);
            services.AddCors();

            ConfigureJWTAuthentication(appSettingsSection, services);
            
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<ILoginService, LoginService>();
            services.AddScoped<IUserProfilePageService, UserProfilePageService>();
            services.AddScoped<IUniqueEmailService, UniqueEmailService>();
            services.AddScoped<IAccountService, AccountService>();
            services.AddScoped<IAdminService, AdminService>();
            services.AddScoped<IBankAccountService, BankAccountService>();
            services.AddScoped<IExchangeService, ExchangeService>();
            services.AddScoped<ITransactionService, TransactionService>();
            services.AddScoped<ICardService, CardService>();
            services.AddHostedService<TimedPaymentService>();
            services.AddScoped<IScopedProcessingService, ScopedProcessingService>();
            services.AddScoped<ICompanyService, CompanyService>();
            services.AddScoped<ITransferFundsService, TransferFundsService>();
            services.AddScoped<IUserCardService, UserCardService>();
            services.AddScoped<ITransferRequestService, TransferRequestService>();
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env, VikingVaultDbContext context)
        {
	        context.Database.Migrate();

			if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseCors(builder => builder.AllowAnyOrigin()
            .AllowAnyHeader()
            .AllowAnyMethod()
            .AllowCredentials());
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseMvc();
        }

        private void ConfigureJWTAuthentication(IConfigurationSection appSettingsSection, IServiceCollection services)
        {
            var appSettings = appSettingsSection.Get<AppSettings>();
            var key = Encoding.ASCII.GetBytes(appSettings.Secret);
            services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.RequireHttpsMetadata = false;
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(key),
                    ValidateIssuer = false,
                    ValidateAudience = false
                };
            });
    }
}
}
