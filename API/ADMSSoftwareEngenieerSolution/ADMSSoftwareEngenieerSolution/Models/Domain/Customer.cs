﻿namespace ADMSSoftwareEngenieerSolution.Models.Domain
{
    public class Customer
    {
        public Guid Id { get; set; }
        public required string firstName { get; set; }
        public string middleName { get; set; }
        public required string lastName { get; set; }
        public required string email { get; set; }

    }
}
