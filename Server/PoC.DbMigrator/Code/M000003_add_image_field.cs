using FluentMigrator;

namespace PoC.DbMigrator.Code
{
    [Migration(000003)]
    public class M000003_add_image_field : ForwardOnlyMigration
    {
        public override void Up()
        {
            Execute.EmbeddedScript("M000003_add_image_field.sql");
        }
    }
}